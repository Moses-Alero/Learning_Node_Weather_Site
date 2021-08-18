const request = require('postman-request');


//Weather stack API request
const forecast = ({latitude,longitude},callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=9f916aedf4fee72ec3f853bcf95e5ccf&query=${latitude},${longitude}`

    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('Weather Server Unavailable!');
        }else if(body.error){
            callback("Unable to find weather details for specified location");
        }else{
            callback("",data={
                Location: body.location.name,
                Temperature: `The current temperature is ${body.current.temperature} degrees Celcius`,
            });
        }
    }) 
}

module.exports = forecast;