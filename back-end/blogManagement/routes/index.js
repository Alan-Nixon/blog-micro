const express = require('express');
const router = express.Router();
const axios = require('axios')
const db = require('../dbConnection');
const client = require('../dbConnection');
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;



router.get('/blog', async (req, res) => {
  try {

    const data = (await client.query('select * from blogs_data')).rows
    console.log(data);

    res.json({ data, status: true })
  } catch (error) {
    console.error(error);
    res.json({ status: false })
  }
});

router.post('/addBlog', async (req, res) => {
  console.log(req.body);
  const { url } = await uploadImage(req.body.image[0].filepath)
  console.log(url);
  const query = {
    text: 'INSERT INTO blogs_data (title, content, image_url, category,userid) VALUES ($1, $2, $3, $4)',
    values: [req.body.title, req.body.content, url, req.body.category],
  };
  console.log(query);
  // Execute the SQL query
  // db.query(query)
  res.json({ status: true })
})




async function uploadImage(imageData) {
  console.log(imageData);
  console.log(process.env.CLOUD_API_KEY);
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });

  const res = await cloudinary.uploader.upload(imageData, {
    resource_type: "auto",
    folder: "blogsImage",
  });
  return res;
}






module.exports = router;


