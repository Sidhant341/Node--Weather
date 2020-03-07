const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')
const app = express()
//Defining path for templates. Views by default wouldn't require this.
const port = process.env.PORT || 3000

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {         //404 page.
    res.render('index', {
        title: 'Weather application',
        name: 'Sidhant'
    })
    })             //Provide name of particular handlebar view as argument

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Sidhant'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        helpText: 'This site uses data from mapbox.com and generates the weather using the darksky api.',
        name: 'Sidhant'
    })
})
// app.get('/help',(req, res) => {
//     res.send('Help page!')
// })

// app.get('/about',(req, res) => {
//     res.send('<h1>You have reached the about page.</h1>')
// })

app.get('/weather',(req, res) => {
    if(!req.query.address) {
        res.send({
            error: 'You must provide an address!'
        })
        return
    }
    geocode(req.query.address, (error,response) => {
        if(error) {
            res.send({error})
            return
        }
        forecast(response.latitude,response.longitude,(error,resp) => {
            if(error) {
                res.send({error})
                return
            }
            res.send({
                location: response.location,
                forecast: resp
            })
        })
    })
})


app.get('/products',(req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term!'
        })
        return
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404 page',
        errormessage: 'Requested help page not found.',
        name: 'Sidhant'
    })
})

app.get('*',(req,res) => {
    res.render('404', {
        title: '404 page',
        errormessage: '404 page reached!',
        name: 'Sidhant'
    })
})
app.listen(port, () => {
    console.log('Server is up on port ' + port + '!')
})
