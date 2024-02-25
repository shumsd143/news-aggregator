const { NEWS_API_KEY } = require("../constants");
const axios = require("axios");
const apiUrl = "https://newsapi.org/v2/everything";

async function getNews(preferences) {
  const queryParams = {
    apiKey: NEWS_API_KEY,
    q: preferences.join(" OR "),
  };
  const response = await axios.get(apiUrl, { params: queryParams });

  const newsArticles = response.data.articles;

  return newsArticles;
}

module.exports = { getNews };
