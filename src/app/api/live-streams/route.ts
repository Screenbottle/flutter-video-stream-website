import { NextResponse } from "next/server";
import xml2js from "xml2js";

const NGINX_STATS_URL = "http://localhost:8080/stat";

export async function GET() {
  try {
    const res = await fetch(NGINX_STATS_URL);
    if (!res.ok) throw new Error("Failed to fetch RTMP stats");

    const xml = await res.text();
    const json = await xml2js.parseStringPromise(xml);

    const streams =
      json?.rtmp?.server?.[0]?.application?.[0]?.live?.[0]?.stream?.map(
        (s: any) => ({
          name: s.name?.[0] ?? "unknown",
          time: parseInt(s.time?.[0] ?? "0", 10),
        })
      ) || [];

    return NextResponse.json({ streams });
  } catch (err) {
    console.error("Error fetching RTMP stats:", err);
    return NextResponse.json({ error: "Failed to fetch streams" }, { status: 500 });
  }
}
