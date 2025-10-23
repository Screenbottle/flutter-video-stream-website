'use client';

import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

interface VideoPlayerProps {
  streamName: string;
}

export default function VideoPlayer({ streamName }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    let hls: Hls | null = null;
    const source = `http://localhost:8080/hls/${streamName}/index.m3u8`;

    if (Hls.isSupported()) {
      hls = new Hls({
        maxBufferLength: 5,
        liveSyncDuration: 2,
        enableWorker: true,
        lowLatencyMode: true,
      });

      hls.loadSource(source);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        console.warn('HLS error:', data);
        setIsPlaying(false);
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = source;
      video.play().catch(() => {});
    }

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handlePause);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handlePause);
      if (hls) hls.destroy();
    };
  }, []);

  return (
    <div className="relative w-full aspect-(--aspect-phone) max-h-[80vh]">
      <video
        ref={videoRef}
        controls
        autoPlay
        className="w-full h-full object-cover rounded-xl"
      />
      <div
        className={`absolute top-3 right-3 flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
          isPlaying
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'
        }`}
      >
        <div
          className={`w-2 h-2 rounded-full ${
            isPlaying ? 'bg-green-500 animate-pulse' : 'bg-red-500'
          }`}
        />
        {isPlaying ? 'Playing' : 'Offline'}
      </div>
    </div>
  );
}
