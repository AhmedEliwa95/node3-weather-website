
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();


const port =process.env.PORT || 3000;
/// dafined paths to express config
const publicDir = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');

//// setup handlebars engine and views location 
app.set('view engine','hbs');
app.set('views' , viewPath);
hbs.registerPartials(partialPath)
/// setup static directory to serve 
app.use(express.static(publicDir)); 


app.get('',(req,res)=>{
    res.render('index.hbs',{
        title:'Weather ',
        name: "Ahmed Eliwa"
    })
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        title:'About this Weather App',
        name:'Ahmed Eliwa'
    })
});
app.get('/help',(rea,res)=>{
    res.render('help',{
        message:'Message for helping',
        title:'Help Page',
        name : 'Ahmed Eliwa'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        errorMessage:"Help article not found"
    })
})

app.get( '' , (req,res) => {
    res.send('Hello Express!!')
});

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an Address'
        });
    }
    geocode(req.query.address , (error , {longitude , latitude , location}={})=>{
        if(error){
            return res.send({error});
        }
        forecast(longitude,latitude,(error,{temperature,feelslike,humidity}={})=>{
            if(error){
                return res.send({error:error});
            }
            res.send({
                temperature,
                feelslike,
                location,
                address:req.query.address,
                humidity
            })
        })
    })
   
});
app.get('/products',(req,res)=>{
    if(!req.query.search){
       return  res.send({
            error:'You must provide a search Term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
    
})
app.get('*',(req,res)=>{
    // res.send('My 404 Page!! ');
    res.render('404',{
        errorMessage:'404 This Page Not Found'
    })
})

app.listen(port , () => {
    console.log(`listen on port: ${port} ` );
});
// app.listen