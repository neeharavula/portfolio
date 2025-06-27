"use client";

import React, { useEffect } from "react";

interface FollowCursorProps {
  color?: string;
}

const FollowCursor: React.FC<FollowCursorProps> = ({ color = "#94A75D" }) => {
  useEffect(() => {
    let canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D | null;
    let animationFrame: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;
    const cursor = { x: 0, y: 0 };
    let hasMoved = false;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const isTouchDevice = () =>
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    class Dot {
      position: { x: number; y: number };
      width: number;
      lag: number;

      constructor(x: number, y: number, width: number, lag: number) {
        this.position = { x, y };
        this.width = width;
        this.lag = lag;
      }

      moveTowards(x: number, y: number, context: CanvasRenderingContext2D) {
        this.position.x += (x - this.position.x) / this.lag;
        this.position.y += (y - this.position.y) / this.lag;
        context.fillStyle = color;
        context.beginPath();
        context.arc(
          this.position.x,
          this.position.y,
          this.width,
          0,
          2 * Math.PI
        );
        context.fill();
        context.closePath();
      }
    }

    const dot = new Dot(0, 0, 7, 10); // Initial position doesn't matter anymore

    const onMouseMove = (e: MouseEvent) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
      if (!hasMoved) {
        dot.position.x = e.clientX;
        dot.position.y = e.clientY;
        hasMoved = true;
      }
    };

    const onWindowResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      if (canvas && context) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        context.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
        context.scale(dpr, dpr);
      }
    };

    const loop = () => {
      if (hasMoved) {
        context?.clearRect(0, 0, width, height);
        dot.moveTowards(cursor.x, cursor.y, context!);
      }
      animationFrame = requestAnimationFrame(loop);
    };

    const init = () => {
      if (prefersReducedMotion.matches || isTouchDevice()) return;

      canvas = document.createElement("canvas");
      context = canvas.getContext("2d");

      canvas.style.position = "fixed";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.style.pointerEvents = "none";
      canvas.style.zIndex = "0";

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context?.scale(dpr, dpr);

      document.body.prepend(canvas);

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("resize", onWindowResize);
      loop();
    };

    const destroy = () => {
      if (canvas) canvas.remove();
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onWindowResize);
    };

    prefersReducedMotion.onchange = () => {
      if (prefersReducedMotion.matches || isTouchDevice()) {
        destroy();
      } else {
        init();
      }
    };

    init();

    return () => {
      destroy();
    };
  }, [color]);

  return null;
};

export default FollowCursor;
