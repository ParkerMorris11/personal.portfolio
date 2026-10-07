import { useEffect, useRef } from "react";

const CursorHalo = () => {
  const haloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const halo = haloRef.current;
    if (!halo) return;

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      halo.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
      halo.style.opacity = "1";
    };

    const hideHalo = () => {
      halo.style.opacity = "0";
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("blur", hideHalo);
    document.documentElement.addEventListener("pointerleave", hideHalo);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", hideHalo);
      document.documentElement.removeEventListener("pointerleave", hideHalo);
    };
  }, []);

  return <div ref={haloRef} className="cursor-halo" aria-hidden="true" />;
};

export default CursorHalo;
