const express = require('express');
const router = express.Router();
const axios = require('axios')
const db = require('../dbConnection');
const client = require('../dbConnection');

router.get('/blog', async (req, res) => {
  try {
    // const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=science&apiKey=${process.env.BLOG_API}`);
    // const data = response.data.articles.map(article => {
    //   return {
    //     title: article.title,
    //     content: article.content,
    //     imageUrl: article.urlToImage
    //   };
    // }).filter(item => (item !== null || '') && (item.imageUrl != null || '') && (item.content != null || ''))

    const data = (await client.query('select * from blogs_data')).rows
    console.log(data);

    // for (const article of data) {
    //   const query = {
    //     text: 'INSERT INTO blogs_data (title, content, image_url, category) VALUES ($1, $2, $3, $4)',
    //     values: [article.title, article.content, article.imageUrl, 'science'],
    //   };

    //   await client.query(query);
    // }



    res.json({ data, status: true })
  } catch (error) {
    console.error(error);
    res.json({ status: false })
  }
});

module.exports = router;
