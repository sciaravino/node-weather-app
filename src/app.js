const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('../utils/geocode')
const weather = require('../utils/weather')

const app = express();
const port = process.env.PORT || 3000

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sal'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About App',
        name: 'Sal C'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is help page',
        title: 'Help',
        name: 'Sal C'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
  
    geocode(req.query.address, (error, { lat, long, location } = {}) => {
        if (error) {
            console.log(error)
            return res.send({
                error: "Unable to find location. Try another search"
            })
            
        }

        weather(lat, long, (error, forecastData) => {
            if (error) {
                console.log(error)
                return res.send({
                    error: "Unable to get the weather. Try something on planet earth"
                })
            }

            res.send({
                temperature: forecastData,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error',{
        title: 'Page not found',
        name: 'Sal C'
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})