const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const searchLocation = search.value
    messageOne.textContent= 'Loadind..'
    messageTwo.textContent= ''
    const url = '/weather?address=' + searchLocation
    fetch(url).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
        }else{
        messageTwo.textContent = data[0].forecastData
        messageOne.textContent = data[0].location
    }
    })
})
})