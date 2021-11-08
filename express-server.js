
const express = require('express')
const morgan = require('morgan')
const got = require('got');
const app = express()
const {router} = require("./Router")
require("dotenv").config()
const e = process.env
const cors = require('cors')
 
// app.use(express.json())
// app.use(express.urlencoded({extended: true}))
// app.use(express.static('public'))
app.use(morgan('tiny'))
app.use(cors())
// app.use('/api', router)

const PORT = e.PORT
const baseURL = "http://api.weatherbit.io/v2.0/current/"

app.get('/api/weather', async (req, res) => {
    try {

        const {latitude, longitude} = req.query

        if (!latitude) {
           return res.status(400).json({message: "Latitude parameter is mandatory-empty"})
        }

        if (!longitude) {
           return res.status(400).json({message: "Longitude parameter is mandatory-empty"})
        }
    
        const response = await got(baseURL, {searchParams: {
            key: e.API_KEY,
            lat: latitude,
            lon: longitude,
        },
        responseType: 'json'
    });

        const [data] = response.body.data
        const {temp, sunrise, weather: {description}, city_name} = data
        res.json({ city_name, temp, description, sunrise})

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}) 

// Custom Middleware
// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.originalUrl} ${new Date().toISOString()}`);
//     next();
// })

// app.get('/home', (req, res) => {
    //     res.send('get request')
    // })
// app.delete('/home', (req, res) => {
//     res.send('delete reuest')
// })

// app.use((req, res) => {
//     res.status(500).json({javascript: 'asdasd'})
// })

app.listen(PORT, (err) => {
    if (err) {
        console.error('Error at a server launch', err);
    }
    console.log(`Server work at port ${PORT}`);
})