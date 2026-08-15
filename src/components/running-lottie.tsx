"use client";

import { useEffect, useRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export function RunningLottie() {
  const containerRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);

  // Physics state (using refs for rAF without causing react re-renders)
  const pos = useRef({ x: 100, y: 0 }); // Current position
  const vel = useRef({ x: 0, y: 0 }); // Current velocity
  const mouse = useRef({ x: -1000, y: -1000 }); // Mouse position relative to container
  const facingRight = useRef(true); // Character direction

  const EVASION_RADIUS = 250;
  const MAX_SPEED = 12;
  const ACCELERATION = 1.2;
  const FRICTION = 0.94;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      // Calculate mouse relative to the page/container
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      // Move mouse virtually far away
      mouse.current = { x: -1000, y: -1000 };
    };

    // Use window for mousemove so it detects approaching cursor early
    window.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const updatePhysics = () => {
      if (!containerRef.current || !characterRef.current) {
        animationFrameId = requestAnimationFrame(updatePhysics);
        return;
      }

      const containerWidth = containerRef.current.clientWidth;
      const charWidth = 100; // approx width of the lottie

      // 1. Calculate distance to mouse
      const charCenterX = pos.current.x + charWidth / 2;
      const charCenterY = 50; // approx center Y of the lottie element

      const dx = mouse.current.x - charCenterX;
      const dy = mouse.current.y - charCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // 2. Movement logic
      const IDLE_SPEED = 2.5;

      if (distance < EVASION_RADIUS) {
        // Run away horizontally
        const runDirection = dx > 0 ? -1 : 1; // if mouse is on right (dx>0), run left (-1)
        
        // Accelerate
        vel.current.x += runDirection * ACCELERATION;

        // Cap speed
        if (vel.current.x > MAX_SPEED) vel.current.x = MAX_SPEED;
        if (vel.current.x < -MAX_SPEED) vel.current.x = -MAX_SPEED;
      } else {
        // Patrol normally
        const direction = facingRight.current ? 1 : -1;
        
        // If we were running fast, smoothly decelerate down to IDLE_SPEED
        if (Math.abs(vel.current.x) > IDLE_SPEED) {
          vel.current.x *= FRICTION;
        } else {
          // Otherwise, just cruise at IDLE_SPEED in whatever direction we are facing
          vel.current.x = direction * IDLE_SPEED;
        }
      }

      // 3. Update Position
      pos.current.x += vel.current.x;

      // 4. Boundary Collision
      if (pos.current.x <= 0) {
        pos.current.x = 0;
        vel.current.x = Math.abs(vel.current.x) * 0.8; // bounce right
        // if mouse is still pushing left, it gets trapped, so we might want to just let it bounce
      } else if (pos.current.x >= containerWidth - charWidth) {
        pos.current.x = containerWidth - charWidth;
        vel.current.x = -Math.abs(vel.current.x) * 0.8; // bounce left
      }

      // 5. Update facing direction visually based on velocity
      if (vel.current.x > 0.5) {
        facingRight.current = true;
      } else if (vel.current.x < -0.5) {
        facingRight.current = false;
      }

      // 6. Apply styles
      characterRef.current.style.transform = `translateX(${pos.current.x}px) scaleX(${facingRight.current ? 1 : -1})`;

      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    animationFrameId = requestAnimationFrame(updatePhysics);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[120px] mb-8 overflow-hidden border-b-2 border-rule"
    >
      <div
        ref={characterRef}
        className="absolute bottom-0 w-[100px] h-[100px] z-10 transition-transform duration-75"
        style={{ transform: "translateX(100px)" }} // initial state
      >
        <DotLottieReact
          src="/images/run_cycle.lottie"
          loop
          autoplay
          className="w-full h-full drop-shadow-[2px_2px_0_var(--ink)]"
        />
      </div>
      
      {/* Decorative environment elements for the character to run on */}
      <div className="absolute bottom-1 right-10 w-2 h-2 rounded-full bg-ink/20" />
      <div className="absolute bottom-2 left-20 w-4 h-1 rounded-full bg-ink/20" />
      <div className="absolute bottom-0 left-1/2 w-8 h-1.5 rounded-full bg-ink/20" />
    </div>
  );
}
