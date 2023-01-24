


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// messageOne.textContent='From JavaScript'

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = 'Loadding....'
    messageOne.textContent = '';
    
    fetch(`/weather?address=${location}`).then((res)=>{
        res.json().then((data)=>{
            if(data.error){
                messageOne.textContent = `   Error  `
                messageTwo.textContent = `${data.error}`
            }else{
                messageOne.textContent = `The Location is: ${data.location}`
                messageTwo.textContent = `Temperature: ${data.temperature} and it's feelsLike: ${data.feelslike}`
            }
            // if(data.error) console.log(data.error);
            // console.log({
            //     temp:data.temperature,
            //     location:data.location,
            //     feelsAs:data.feelslike
            // })
        })
    });
});


