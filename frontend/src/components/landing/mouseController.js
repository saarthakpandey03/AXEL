import { useEffect, useRef } from "react";

// Simple mouse controller that stores normalized device coords (NDC).
// The consumer can read `mouseRef.current` to access `{ x, y }` in NDC.

export function useMouse() {
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    function onMove(e) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const x = (e.clientX / w) * 2 - 1;
      const y = -(e.clientY / h) * 2 + 1;
      mouseRef.current.x = x;
      mouseRef.current.y = y;
      mouseRef.current.active = true;
    }

    function onLeave() {
      mouseRef.current.active = false;
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return mouseRef;
}
