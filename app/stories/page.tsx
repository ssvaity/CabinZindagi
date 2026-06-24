import { Stories } from "@/components/Stories";

const CHANNEL_ID = "UCQXmE1mYZFDzvBn0AXMqTrA"; // @cabinzindagi

function decode(s: string) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

// Newest 3 uploads (videos or shorts) from the channel's public RSS feed.
async function getLatestVideos(): Promise<{ id: string; title: string }[]> {
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
      { next: { revalidate: 3600 } }, // refresh hourly
    );
    if (!res.ok) return [];
    const xml = await res.text();
    return xml
      .split("<entry>")
      .slice(1)
      .map((e) => ({
        id: e.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] ?? "",
        title: decode(e.match(/<title>([^<]+)<\/title>/)?.[1] ?? ""),
      }))
      .filter((v) => v.id && v.title)
      .slice(0, 3);
  } catch {
    return [];
  }
}

export default async function StoriesPage() {
  const latestVideos = await getLatestVideos();
  return <Stories latestVideos={latestVideos} />;
}
