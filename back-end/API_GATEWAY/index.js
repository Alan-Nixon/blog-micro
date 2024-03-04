const express = require('express')
const axios = require('axios')
require('dotenv').config()
const PORT = process.env.PORT || 5000
const app = express()
const formidable = require('formidable')

const cors = require('cors')


app.use(require('morgan')('dev'))
app.use(express.json())

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'Session']
}))


app.listen(PORT, () => console.log(`http:localhost:${PORT}`, "FROM API GATEWAY"))


app.get('/user/:Route', async (req, res) => {
    try {
        const token = '?token=' + req.headers['authorization'] || ""
        const { data } = await axios.get(`${process.env.USERSERVICE + req.params.Route + token}`, { withCredentials: true })
        console.log("GET CALL TO USER SERVICE");
        res.json(data)
    } catch (error) {
        console.log(error);
        res.json({ status: false })
    }
})

app.post('/user/:Route', async (req, res) => {
    try {
        console.log("POST CALL TO USER SERVICE");
        const { data } = await axios.post(`${process.env.USERSERVICE + req.params.Route}`, req.body, { withCredentials: true })
        res.json(data)
    } catch (error) {
        console.log(error);
        res.json({ status: false })
    }
})

app.get('/blog/:Route', async (req, res) => {
    try {
        console.log("this is the blog");
        const token = '?token=' + req.headers['authorization'] || ""
        const { data } = await axios.get(`${process.env.BLOGSERVICE + req.params.Route + token}`, { withCredentials: true })
        console.log("GET CALL TO BLOG SERVICE", data);
        res.json(data)
    } catch (error) {
        console.log(error);
        res.json({ status: false })
    }
})


app.post('/blog/:Route', async (req, res) => {
    try {
        let Data = {};
        const headers = { withCredentials: true };

        if (req.headers['content-type'].includes('multipart/form-data')) {
            // console.log(req.headers['authorization']);
            const form = new formidable.IncomingForm();
            form.parse(req, async (err, fields, files) => {
                try {
                    if (err) {
                        console.error('Error parsing form data:', err);
                        return res.status(500).json({ error: 'Error parsing form data' });
                    }

                    Data = {
                        title: fields['title'][0],
                        category: fields['cate'][0],
                        content: fields['content'][0],
                        image: files['image'],
                        token: req.headers['authorization']
                    };

                    console.log("POST CALL TO BLOG SERVICE", Data, headers);

                    const { data } = await axios.post(`${process.env.BLOGSERVICE + req.params.Route}`, Data, headers);
                    res.json(data);
                } catch (error) {
                    console.error('Error posting data to blog service:', error);
                    res.status(500).json({ error: 'Error posting data to blog service' });
                }
            });
        } else {
            Data = req.body;
            console.log("POST CALL TO BLOG SERVICE", Data, headers);
            try {
                const { data } = await axios.post(`${process.env.BLOGSERVICE + req.params.Route}`, Data, headers);
                res.json(data);
            } catch (error) {
                console.error('Error posting data to blog service:', error);
                res.status(500).json({ error: 'Error posting data to blog service' });
            }
        }
    } catch (error) {
        console.error('Internal server error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = app