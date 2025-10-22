"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Video, Clock } from "lucide-react";

export default function StreamDashboard() {
    const [streams, setStreams] = useState<{ name: string; time: number }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStreams() {
            try {
                const res = await fetch("/api/live-streams");
                const data = await res.json();
                setStreams(data.streams || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchStreams();
        const interval = setInterval(fetchStreams, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col items-center p-6">
            {loading ? (
                <Loader2 className="animate-spin text-slate-500" size={32} />
            ) : streams.length === 0 ? (
                <p className="text-slate-600">No active streams at the moment.</p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full max-w-4xl">
                    {streams.map((s) => (
                        <Card key={s.name} className="shadow-md hover:shadow-lg transition">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-lg font-semibold">{s.name}</CardTitle>
                                <Video className="text-emerald-500" size={20} />
                            </CardHeader>
                            <CardContent className="flex items-center gap-2 text-slate-600">
                                <Clock size={16} />
                                <span>Live for {Math.floor(s.time / 60)} min</span>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
