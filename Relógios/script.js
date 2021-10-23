//Selecionar o elementos 

let digitalElement = document.querySelector('.digital')
let sElement = document.querySelector('.p_s')
let mElement = document.querySelector('.p_m')
let hElement = document.querySelector('.p_h')

function updateClock() {
    let now = new Date() //pega a data atual
    let hour = now.getHours() //a partir da data tira a hora
    let minute = now.getMinutes() //a partir da data tira minutos
    let second = now.getSeconds() //a partir da data tira segundos

    //digital

    digitalElement.innerHTML = `${fixZero(hour)}:${fixZero(minute)}:${fixZero(second)}`

    //analogicos

    let sDeg = ((360/60) * second) - 90 //grau do ponteiro de segundos 
    let mDeg = ((360/60) * minute) - 90 //grau do ponteiro de minutos 
    let hDeg = ((360/12) * hour) - 90 //grau do ponteiro das horas

    sElement.style.transform = `rotate(${sDeg}deg)` //coloca o ponteiro no grau certo (segundos)
    mElement.style.transform = `rotate(${mDeg}deg)` //coloca o ponteiro no grau certo (minutos)
    hElement.style.transform = `rotate(${hDeg}deg)` //coloca o ponteiro no grau certo (hora)
}

//função para sempre colocar zero quando tiver so uma casa

function fixZero(time) {
    return time < 10 ? `0${time}` : time
}

//Timer para atualizar a cada 1 segundo a função upadateClock

setInterval(updateClock, 1000)
updateClock()












