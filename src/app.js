//core modules
const path = require('path');

//npm modules
const express = require('express');
const hbs = require('hbs');

//created modules
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js'); 

const app = express();
  
const PublicDirectoryPath = path.join(__dirname,'../public/');
const viewsPath = path.join(__dirname,'../templates/views')
const Partials_path =path.join(__dirname, '../templates/partials');

hbs.registerPartials(Partials_path); //register the location of the partials to be used by handlebars
app.set('view engine','hbs');
app.set('views',viewsPath);
app.use(express.static(PublicDirectoryPath)) // still don't understand this line of code completely


//app.get used to serve up data from the sever and also receives request from the websites
app.get('/index', (req,res)=>{
    res.render('index',{
        title:"Weather",
        name:"John Bosco"
    });
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page edited',
        name:"Moses"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.location){
        return res.send({
            error:"Must Input address"
        })
    }
    geocode(req.query.location,(error,geo_data)=>{
        if(error) return res.send({error});

        forecast(geo_data,(error,data)=>{
            if(error) return res.send({error});
             res.send(data= {Address:req.query.location,...data});   
        })
    })
    
});

app.get('/about', (req,res)=>{
    res.render('about',{
        title:'About Page',
        name:"John thomas"
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"Must enter item to search"
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    //res.render(takes in two arguments which the data is to be served to and the data to be sent)
    res.render('error',{
        title:'404',
        msg:'Help article not found'
    });
})
app.get('*',(req,res)=>{
    res.render('error',{
        title:"404",
        msg:'Page not found',
        name:"Moses"
    })
})


+
app.listen(3000,()=>{
    console.log("Server started running successfully")
})