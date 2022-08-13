const selector = (el)=> document.querySelector(el)

selector('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault()

    clearInfo()

    let input = selector('#searchInput').value

    if(input !== ''){  // Caso tiver algo digitado
        showWarning('Carregando...')
        encodeURI(input)  // Passa do jeito que temos que passar para uma URL
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=525b6d2a5d6230e9df6449a483094f3a&units=metric&lang=pt_br`

        let results = await fetch(url)
        let json = await results.json()

        if(json.cod == 200){  // Encontrou a cidade
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })

        } else{
            clearInfo()
            showWarning('Não encontramos esta localização.')
        }

    } else{
        clearInfo()
    }

})

function showInfo(jsonRecebido){
    showWarning('')  // Tira o 'carregando...' quando tiver carregado

    selector('.resultado').style.display = 'block'

    selector('.titulo').innerHTML = `${jsonRecebido.name}, ${jsonRecebido.country}`
    selector('.tempInfo').innerHTML = `${jsonRecebido.temp}  <sup>C°</sup>`
    selector('.ventoInfo').innerHTML = `${jsonRecebido.windSpeed}  <span>Km/h</span>`

    selector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${jsonRecebido.tempIcon}@2x.png`)

    selector('.ventoPonto').style.transform = `rotate(${jsonRecebido.windAngle - 90}deg)`  // -90 devido ao rotate

}

function clearInfo(){
    showWarning('')
    selector('.resultado').style.display = 'none'
}

function showWarning(msg){
    selector('.aviso').innerHTML = msg
}
