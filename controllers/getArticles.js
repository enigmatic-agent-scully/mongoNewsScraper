const cheerio = require('cheerio');
const axios = require('axios');
const siteURL = 'http://www.projectq.us';
var Article = require('../models/article');

module.exports = {
  scrape: (req, res) => {
    return axios
      .get(`${siteURL}/atlanta`)
      .then(response => {
        const $ = cheerio.load(response.data);
        const articles = [];
        $('div.entry').each(function(i, element) {
          var result = {};

          var link = $(element)
            .find('a')
            .attr('href');

          result.title = $(element)
            .find('h1 a')
            .text();

          result.link = `${siteURL}${link}`;

          articles.push(result);
        });
        return articles;
      })
      .then(articles => {
        return Article.create(articles);
      })
      .then(dbArticle => {
        if (dbArticle.length === 0) {
          res.json({
            message: 'No new articles today. Check back tomorrow!'
          });
        } else {
          res.json({
            message: `Added ${dbArticle.length} new articles!`
          });
        }
      })
      .catch(err => {
        res.json({
          message: 'Scrape complete!'
        });
      });
  }
};
