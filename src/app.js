const path = require('path');
const express = require('express');
const hbs = require('hbs');

const forecast= require('./utils/forecast');
const  geoCode = require('./utils/geocode');

const app = express();

//Define paths for express config
const publicDirPath = path.join(__dirname, '..', '/public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handelbars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('/', (req, res) => {
   res.render('index', {
       title: 'Weather',
       name: 'Nimi'
   });
});

app.get('/about', (req, res) => {
   res.render('about', {
        title: 'About',
        name: 'Nimi'
   });
});

app.get('/help', (req, res) => {
   res.render('help', {
       helpMessage: 'How can we help?',
       title: 'Help',
       name: 'Nimi'
   });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            err: 'You must provide an address!'
        });
    }
    geoCode(req.query.address, (err, { latitude, longitude, location } = {}) => {
        if (err) {
            return res.send({ err });
        }
        forecast(latitude, longitude, (err, forecastData) => {
            if (err) {
                return res.send({ err });
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
           error: 'You must provide a search term!'
        });
    }
    console.log(req.query.search);
   res.send({
       products: []
   });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found.',
        title: '404',
        name: 'Nimi'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found.',
        title: '404',
        name: 'Nimi'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});