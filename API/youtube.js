export default async function handler(req, res) {
  const { topic } = req.query;

  const ytRes = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=3&q=${topic}&key=${process.env.YOUTUBE_API_KEY}`
  );

  const ytData = await ytRes.json();
  const videos = ytData.items.map(i => i.id.videoId);

  res.status(200).json({ videos });
}
