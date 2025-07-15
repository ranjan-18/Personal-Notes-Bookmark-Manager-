const axios = require('axios');
const cheerio = require('cheerio');

const fetchTitleFromURL = async (url) => {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  return $('title').text().trim();
};

module.exports = fetchTitleFromURL;
