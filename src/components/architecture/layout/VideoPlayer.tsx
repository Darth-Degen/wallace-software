import { useEffect, useRef } from "react";
import { cn } from "@utils";
import "video.js/dist/video-js.css";
import "videojs-contrib-quality-levels";
import Player from "video.js/dist/types/player";

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
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    let cancelled = false;
    const init = async () => {
      if (!videoNodeRef.current) return;
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }

      const { default: videojsLib } = await import("video.js");

      if (cancelled || !videoNodeRef.current) return;

      const player = videojsLib(videoNodeRef.current, {
        autoplay,
        muted,
        loop,
        controls,
        playsinline: playsInline,
        preload: "auto",
        responsive: false,
        fluid: false,
        html5: {
          vhs: {
            overrideNative: true,
          },
        },
        sources: [
          {
            src: `https://videodelivery.net/${videoId}/manifest/video.m3u8`,
            type: "application/x-mpegURL",
          },
        ],
      });

      // Quality selection
      player.ready(() => {
        const qualityLevels = (player as any).qualityLevels?.();
        if (qualityLevels) {
          qualityLevels.on("addqualitylevel", () => {
            for (let i = 0; i < qualityLevels.length; i++) {
              const level = qualityLevels[i];
              // Enable only target (or keep all if no quality prop)
              level.enabled = !quality || level.height === quality;
            }
          });
        }
      });

      playerRef.current = player;
    };

    init();

    return () => {
      cancelled = true;
      if (playerRef.current) {
        try {
          playerRef.current.dispose();
        } catch (_e) {}
        playerRef.current = null;
      }
    };
  }, [videoId, autoplay, muted, loop, controls, playsInline, quality]);

  return (
    <div data-vjs-player className={cn("w-full h-full", parentClassName)}>
      <video
        ref={videoNodeRef}
        className={cn(
          "video-js vjs-default-skin w-full h-full aspect-video",
          className
        )}
        playsInline={playsInline}
        // These attrs help autoplay policies
        muted={muted}
        loop={loop}
        controls={controls}
        {...rest}
      />
    </div>
  );
};

export default CloudflareVideoPlayer;
