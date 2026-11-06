import { memo, useEffect, useRef } from "react";
import Hls from "hls.js";

const WAVE_SRC = "https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8";

const VideoPlayer = memo(() => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      video.removeAttribute("autoplay");
      video.pause();
      return;
    }

    if (typeof Hls !== "undefined" && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(WAVE_SRC);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
      return () => {
        hls.destroy();
      };
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = WAVE_SRC;
      const onLoaded = () => {
        video.play().catch(() => {});
      };
      video.addEventListener("loadedmetadata", onLoaded);
      return () => {
        video.removeEventListener("loadedmetadata", onLoaded);
      };
    }
  }, []);

  return (
    <video
      ref={videoRef}
      className="w-full h-full object-cover"
      autoPlay
      loop
      muted
      playsInline
      aria-hidden="true"
    />
  );
});

VideoPlayer.displayName = "VideoPlayer";
export default VideoPlayer;
