//add evento quando clica na tecla
document.body.addEventListener('keyup', (event)=>{ 
    playSound( event.code.toLowerCase() )
}) 


//add evento no botão e habilita o form, colocando as coisas escritas em um array 
document.querySelector('.composer button').addEventListener('click', () =>{
    let song = document.querySelector('#input').value

    if( song !== '') {
        let songArray = song.split('')
        playComposition(songArray)
    }
})


//função que faz os som sair
function playSound(sound) {
    let audioElement = document.querySelector(`#s_${sound}`)
    let keyElement = document.querySelector(`div[data-key="${sound}"]`)

    if(audioElement) {
        audioElement.currentTime = 0 //zera o som, quando clica numa tecla nova  
        audioElement.play()
    }

    if(keyElement) {
        keyElement.classList.add('active')

        setTimeout(()=>{
            keyElement.classList.remove('active')
        }, 300)
    }
}

//função que faz o formulario sair som
function playComposition(songArray) {
    let wait = 0

    for(let songItem of songArray) {
        setTimeout(()=>{
            playSound(`key${songItem}`)
        }, wait)

        wait += 250
    }
}