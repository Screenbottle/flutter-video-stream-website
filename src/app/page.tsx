"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
      <h1 className="text-4xl font-bold tracking-tight text-slate-800">
        Flutter Live Stream
      </h1>
      <p className="text-slate-600 max-w-md">
        Watch your Flutter app’s live video stream.
      </p>

      <div className="flex gap-4 mt-4">
        <Link href="/stream">
          <Button size="lg" className="flex items-center gap-2">
            <Video className="w-5 h-5" />
            View Stream
          </Button>
        </Link>
      </div>
    </div>
  );
}
