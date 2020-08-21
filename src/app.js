const path = require('path')
const express = require('express')
const hbs = require ('hbs')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')
const app = express()

//Define Paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handle bar engine and view locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather API',
        name: 'Manoj Khatri'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Manoj Khatri'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        name: 'Manoj Khatri',
        title: 'Help Page',
        message: 'We are at your service to assist with your API needs'
    })
})
app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
           return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
             }
            console.log(location)
            console.log(forecastData)
            res.send([{
                location,
                forecastData:forecastData
            }])
    })})
    /*
    res.send([{
        location:'Indianapolis, Indiana',
        address: req.query.address,
        currentTemperature: 80,
        feelsLile: 85
    },{
        location: 'Zionsville, Indiana',
        address: req.query.address,
        currentTemperature: 78,
        feelsLile: 81
    }])*/
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Manoj Khatri',
        errorMessage: 'Help Article Not Found'
    })
})
app.get('*',(req, res)=>{
    res.render('404',{
        title: '404',
        name: 'Manoj Khatri',
        errorMessage: 'Page Not Found'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})