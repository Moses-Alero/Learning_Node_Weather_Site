const request = require('postman-request');

//Geocode api request
const geocode =(address,callback)=>{
    const url =`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibW9zZXNhbGVybyIsImEiOiJja3J4a2EwNTkwcjZvMnFzN3l6MG5qOXR2In0.6iLjIGHxxQCWWhlJo0z7HA&limit=1`;

    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback("Unable to connect to server!");
        }else if(!body.features || !body.features[0]){
            callback("Invalid Location or Location not available");
        }else{
            callback("",data={
                Location:body.features[0].place_name,
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0] 
            });
        }
    })
}

module.exports = geocode;