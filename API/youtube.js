import fetch from "node-fetch";

export default async function handler(req, res) {
  const { topic } = req.query;

  if (!topic) return res.status(400).json({ error: "Topic is required" });

  const YOUTUBE_API_KEY = process.env.STUDY_YOUTUBEAPI_KEY;

  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${encodeURIComponent(topic)}&key=${YOUTUBE_API_KEY}`);
    const data = await response.json();

    const videos = data.items.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url
    }));

    res.status(200).json({ videos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "YouTube API error" });
  }
}
