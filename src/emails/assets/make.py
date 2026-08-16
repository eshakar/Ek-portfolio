"""lottie (.lottie) -> email-safe animated GIF.

Email clients run no JavaScript, so a lottie player can never work in an inbox;
an animated GIF is the only format that moves in Gmail/Apple Mail/Outlook.com.
Frames are rendered by driving lottie-web in headless Chrome onto one sprite
sheet (a single screenshot beats N screenshots), then sliced here.

usage: make.py <name.lottie> <out.gif> [--cols N] [--step N] [--size N]
"""

import json
import math
import os
import shutil
import subprocess
import sys
import tempfile
import zipfile

from PIL import Image

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
CELL = 240
BG = (247, 241, 230)  # --paper, matches the email panel behind the image

SHEET_HTML = """<!doctype html><html><head><meta charset="utf-8">
<style>html,body{margin:0;padding:0;background:transparent}
#stage{position:fixed;left:-9999px;top:0;width:CELLpx;height:CELLpx}</style></head>
<body><canvas id="sheet"></canvas><div id="stage"></div>
<script src="lottie.js"></script>
<script>
const CELL=CELL_V, COLS=COLS_V, IDX=IDX_V;
const data=ANIM_DATA;
const rows=Math.ceil(IDX.length/COLS);
const sheet=document.getElementById('sheet');
sheet.width=COLS*CELL; sheet.height=rows*CELL;
const sctx=sheet.getContext('2d');
const anim=lottie.loadAnimation({container:document.getElementById('stage'),
  renderer:'canvas',loop:false,autoplay:false,animationData:data,
  rendererSettings:{clearCanvas:true,preserveAspectRatio:'xMidYMid meet'}});
anim.addEventListener('DOMLoaded',()=>{
  const inner=document.querySelector('#stage canvas');
  IDX.forEach((f,i)=>{anim.goToAndStop(f,true);
    sctx.drawImage(inner,(i%COLS)*CELL,Math.floor(i/COLS)*CELL,CELL,CELL);});
});
</script></body></html>"""


def render_sheet(lottie_path, indices, cols, workdir):
    with zipfile.ZipFile(lottie_path) as z:
        name = next(n for n in z.namelist() if n.startswith("animations/"))
        data = z.read(name).decode()

    html = (SHEET_HTML
            .replace("CELL_V", str(CELL))
            .replace("COLS_V", str(cols))
            .replace("IDX_V", json.dumps(indices))
            .replace("CELLpx", f"{CELL}px")
            .replace("ANIM_DATA", data))

    page = os.path.join(workdir, "sheet.html")
    shot = os.path.join(workdir, "sheet.png")
    open(page, "w").write(html)
    shutil.copy(os.path.join(os.path.dirname(__file__), "lottie.js"),
                os.path.join(workdir, "lottie.js"))

    rows = math.ceil(len(indices) / cols)
    subprocess.run([
        CHROME, "--headless=old", "--disable-gpu", "--no-sandbox",
        "--hide-scrollbars", "--force-device-scale-factor=1",
        "--default-background-color=00000000", "--virtual-time-budget=20000",
        f"--window-size={cols * CELL},{rows * CELL}",
        f"--screenshot={shot}", f"file://{page}",
    ], check=True, capture_output=True)
    return Image.open(shot).convert("RGBA"), rows


def build(lottie_path, out_path, cols=5, step=1, size=220, colors=64, fps=30):
    with zipfile.ZipFile(lottie_path) as z:
        name = next(n for n in z.namelist() if n.startswith("animations/"))
        meta = json.loads(z.read(name))
    total = round(meta["op"] - meta["ip"])
    indices = list(range(0, total, step))
    src_fps = meta.get("fr", 30)

    workdir = tempfile.mkdtemp()
    sheet, rows = render_sheet(lottie_path, indices, cols, workdir)

    frames = [sheet.crop(((i % cols) * CELL, (i // cols) * CELL,
                          (i % cols) * CELL + CELL, (i // cols) * CELL + CELL))
              for i in range(len(indices))]

    box = None
    for f in frames:
        b = f.getbbox()
        if b is None:
            continue
        box = b if box is None else (min(box[0], b[0]), min(box[1], b[1]),
                                     max(box[2], b[2]), max(box[3], b[3]))
    pad = 6
    box = (max(0, box[0] - pad), max(0, box[1] - pad),
           min(CELL, box[2] + pad), min(CELL, box[3] + pad))
    side = max(box[2] - box[0], box[3] - box[1])
    cx, cy = (box[0] + box[2]) // 2, (box[1] + box[3]) // 2
    box = (cx - side // 2, cy - side // 2, cx + side // 2, cy + side // 2)

    rgb = []
    for f in frames:
        c = f.crop(box)
        flat = Image.new("RGBA", c.size, BG + (255,))
        flat.alpha_composite(c)
        rgb.append(flat.convert("RGB").resize((size, size), Image.LANCZOS))

    # One shared palette so later frames encode as diffs, not full images.
    strip = Image.new("RGB", (size, size * len(rgb)))
    for i, f in enumerate(rgb):
        strip.paste(f, (0, i * size))
    palette = strip.quantize(colors=colors, method=Image.MEDIANCUT)
    out = [f.quantize(palette=palette, dither=Image.NONE) for f in rgb]

    # Median cut lands the flat backdrop a shade off BG, which shows up as a
    # faint square against the email panel. Rewriting the palette entry the
    # backdrop mapped to (rather than the source palette, whose mapping table
    # quantize() has already cached) snaps every frame back to the exact colour.
    bg_index = out[0].getpixel((0, 0))
    for frame in out:
        pal = frame.getpalette()
        pal[bg_index * 3:bg_index * 3 + 3] = list(BG)
        frame.putpalette(pal)

    duration = max(20, round(1000 / src_fps * step))
    out[0].save(out_path, save_all=True, append_images=out[1:],
                duration=duration, loop=0, optimize=True, disposal=1)
    shutil.rmtree(workdir, ignore_errors=True)

    check = Image.open(out_path)
    check.seek(0)
    corner = check.convert("RGB").getpixel((0, 0))
    print(f"{os.path.basename(out_path)}: {len(out)} frames, {duration}ms/frame, "
          f"{os.path.getsize(out_path) / 1024:.1f} KB, crop {side}px, "
          f"backdrop {corner}{'' if corner == BG else ' MISMATCH'}")


if __name__ == "__main__":
    args = sys.argv[1:]
    kw = {}
    for flag, cast in (("--cols", int), ("--step", int), ("--size", int),
                       ("--colors", int)):
        if flag in args:
            i = args.index(flag)
            kw[flag[2:]] = cast(args[i + 1])
            del args[i:i + 2]
    build(args[0], args[1], **kw)
