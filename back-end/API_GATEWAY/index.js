const express = require('express')
const axios = require('axios')
require('dotenv').config()
const PORT = process.env.PORT || 5000
const app = express()

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
        console.log("GET CALL TO BLOG SERVICE",data);
        res.json(data)
    } catch (error) {
        console.log(error);
        res.json({ status: false })
    }
})


module.exports = app