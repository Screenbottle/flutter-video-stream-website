import VideoPlayer from "@/components/videoPlayer";
import { Radio, Signal } from "lucide-react";

interface StreamPageProps {
  searchParams: { name?: string };
}

export default async function StreamPage({ searchParams }: StreamPageProps) {
  const { name } = await searchParams;

  return (
    !name?.length ? (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
        <h1 className="text-4xl font-bold tracking-tight text-slate-800 mb-8">
          No stream specified
        </h1>
        <p className="text-slate-600">
          No stream selected. Please go back to the homepage and select a live stream to view.
        </p>
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
        <h1 className="text-4xl font-bold tracking-tight text-slate-800 my-8">
          Live Stream
        </h1>

        <div className="bg-white/70 backdrop-blur-lg shadow-lg rounded-2xl border border-slate-200 p-6 w-full max-w-3xl flex flex-col items-center gap-6">

          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Radio className="w-5 h-5 text-red-500 animate-pulse" />
              <span className="font-medium text-slate-700">LIVE</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-1">
                <Signal className="w-4 h-4" /> 720p
              </div>
              <span>30 FPS</span>
            </div>
          </div>


          <div className="w-full rounded-xl overflow-hidden shadow-md border border-slate-300 bg-black">
            <VideoPlayer streamName={name} />
          </div>

          <div className="text-center text-sm text-slate-600 mt-2">
            Stream source:{" "}
            <code className="bg-slate-100 px-2 py-1 rounded">
              http://localhost:8080/hls/{name}/index.m3u8
            </code>
          </div>
        </div>
      </div>
    )
  );
}
