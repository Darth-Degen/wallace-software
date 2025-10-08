"use client";
import { useEffect, useRef } from "react";
import { cn } from "@utils";
import "video.js/dist/video-js.css";
import "videojs-contrib-quality-levels";
// Removed runtime import of types

interface CloudflareVideoPlayerProps
  extends React.VideoHTMLAttributes<HTMLVideoElement> {
  videoId?: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  playsInline?: boolean;
  quality?: 360 | 480 | 720 | 1080;
  className?: string;
  parentClassName?: string;
}

const CloudflareVideoPlayer = ({
  videoId = "dd20e765bdeb6307d8b0c1a1399c8b83",
  autoplay = false,
  muted = false,
  loop = false,
  controls = false,
  playsInline = false,
  quality = 1080,
  className,
  parentClassName,
  ...rest
}: CloudflareVideoPlayerProps) => {
  const videoNodeRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any>(null);

  // One-time init
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!videoNodeRef.current) return;
      const { default: videojs } = await import("video.js");
      if (cancelled || !videoNodeRef.current) return;

      playerRef.current = videojs(videoNodeRef.current, {
        autoplay,
        muted,
        loop,
        controls, // initial state
        playsinline: playsInline,
        preload: "auto",
        html5: { vhs: { overrideNative: true } },
        sources: [
          {
            src: `https://videodelivery.net/${videoId}/manifest/video.m3u8`,
            type: "application/x-mpegURL",
          },
        ],
      });

      // Quality filter
      playerRef.current.ready(() => {
        const qualityLevels = playerRef.current?.qualityLevels?.();
        if (qualityLevels && quality) {
          qualityLevels.on("addqualitylevel", () => {
            for (let i = 0; i < qualityLevels.length; i++) {
              const level = qualityLevels[i];
              level.enabled = level.height === quality;
            }
          });
        }
      });
    })();

    return () => {
      cancelled = true;
      if (playerRef.current) {
        try {
          playerRef.current.dispose();
        } catch {}
        playerRef.current = null;
      }
    };
    // Only initialize once per videoId
  }, [videoId, quality, autoplay]);

  // Sync mutable props without full reinit
  useEffect(() => {
    const p = playerRef.current;
    if (!p) return;
    p.muted(muted);
    p.loop(loop);
    p.controls(controls);
    // playsInline is an attribute on the video element
    // if (videoNodeRef.current) {
    //   if (playsInline) videoNodeRef.current.setAttribute("playsinline", "");
    //   else videoNodeRef.current.removeAttribute("playsinline");
    // }
  }, [muted, loop, controls, playsInline]);

  // Fallback: If you want native only when controls true (skip video.js):
  // if (controls) return <video controls ... />

  return (
    <div data-vjs-player className={cn("w-full h-full", parentClassName)}>
      <video
        ref={videoNodeRef}
        className={cn("video-js vjs-default-skin w-full h-full", className)}
        // Keep basic attrs (video.js will enhance)
        muted={muted}
        loop={loop}
        // Leave controls attr off; video.js manages it (will add/remove via p.controls())
        playsInline={playsInline}
        {...rest}
      />
    </div>
  );
};

export default CloudflareVideoPlayer;
