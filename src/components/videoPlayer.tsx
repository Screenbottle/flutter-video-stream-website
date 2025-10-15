'use client';

import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    if (Hls.isSupported()) {
      const hls = new Hls({
        maxBufferLength: 5,
        liveSyncDuration: 2,
        enableWorker: true,
        lowLatencyMode: true,
        debug: true,
      });
      console.log("HLS.js is supported");
      hls.loadSource('http://127.0.0.1:8080/hls/index/index.m3u8');
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari fallback
      video.src = 'http://127.0.0.1:8080/hls/index/index.m3u8';
      video.play().catch(() => {});
    }
  }, []);

  return <video ref={videoRef} controls autoPlay width={640} height={360} />;
}
