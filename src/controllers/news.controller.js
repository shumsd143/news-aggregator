const { getNews } = require("../services/news.service");

async function get(req, res) {
  try {
    const news = await getNews(req.user.preferences);
    res.status(200).json({ news: news });
  } catch (error) {
    console.error("Error fetching news articles:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { get };
