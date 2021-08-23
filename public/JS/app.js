const fetchLocation = (location)=>{
    fetch(`/index/weather?location=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error) return msg_1.textContent =  data.error;
        msg_1.textContent = data.Location;
        msg_2.textContent = data.Temperature;
    })
})
}

const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const msg_1 = document.querySelector('#message-1');
const msg_2 = document.querySelector('#message-2');

weatherForm.addEventListener('submit',(event)=>{
    msg_1.textContent='';
    msg_2.textContent='';
    event.preventDefault();
    const location = searchInput.value;
    msg_1.textContent = 'Loading Forecast' 
    fetchLocation(location);
})