const axios = require('axios');
const cheerio = require('cheerio');

const fetchTitleFromURL = async (url) => {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const title = $('title').text();
    return title || '';
  } catch (error) {
    console.error('Failed to fetch title:', error.message);
    return '';
  }
};

module.exports = fetchTitleFromURL;
