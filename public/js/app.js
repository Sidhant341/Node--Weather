
// fetch('http://puzzle.mead.io/puzzle').then( (response) => {
//     response.json().then( (data) => {
//         console.log(data)
//     } )
// })

// fetch('http://localhost:3000/weather?address=12what').then( (response) => {
//     response.json().then( (data) => {
//         if(data.error) {
//             console.log(data.error)
//         }
//         else {
//             console.log(data.forecast)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#msg-1')
const messageTwo = document.querySelector('#msg-2')
//messageOne.textContent = 'From Javascript!'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading!'
    const location = search.value
    messageTwo.textContent = ''
    fetch('/weather?address=' + location).then( (response) => {
    response.json().then( (data) => {
        messageOne.textContent = ''
        if(data.error) {
            messageTwo.textContent = data.error
        }
        else {
            messageOne.textContent = data.location + '.' 
            messageTwo.textContent = data.forecast

        }
    })
})
})