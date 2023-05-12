const temperatura = document.querySelector('#temperatura');
const img = document.querySelector('#imagem-referencia');
const infoImage = document.querySelector('#info-image');
const resultado = document.querySelector('.resultado');
const container = document.querySelector('.container');
const messageerror = document.querySelector('.error');
const cidade = document.querySelector('#cidade');
const search = document.querySelector('#search');
const botao = document.querySelector('#button');
const vento = document.querySelector('#vento');
const h2 = document.querySelector('#h2-error');
const move = document.querySelector('#move');
const time = 2000;
const durationBackAnimation = 500;
const backAnimation = time - durationBackAnimation;

botao.addEventListener('click', pesquisa);

document.addEventListener('keyup', (e) => {
    if(e.keyCode == 13){
        pesquisa();
    }
});

function pesquisa(){
    if(!search.value) return;
    pegaValorDaApi();
}

async function pegaValorDaApi(){
    const key = '359bb316017535ca9c0b9bcb3a7381c9';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(search.value)}&units=metric&appid=${key}`;

    try {
        await fetch(url).then((res) => res.json()).then((data) => {
            if(data.cod === '404'){
                search.value = ''
                return errorMessage01();
            }

            valoresDaApi(data);
        });

    } catch(error) {
        search.value = ''
        errorMessage02(error)
    }
}

function errorMessage01(){
    messageerror.classList.add('active');
    h2.classList.add('active');
    h2.innerHTML = 'Local não encontrado!';

    setTimeout (() => {
        messageerror.classList.add('anima');
        h2.classList.add('anima');
    }, backAnimation)

    setTimeout(() => {
        messageerror.classList.remove('active');
        h2.classList.remove('active');
        messageerror.classList.remove('anima');
        h2.classList.remove('anima');
    }, time);
}

function errorMessage02(error){
    messageerror.classList.add('active');
    h2.classList.add('active');
    h2.innerHTML = error;

    setTimeout (() => {
        messageerror.classList.add('anima');
        h2.classList.add('anima');
    }, backAnimation)

    setTimeout(() => {
        messageerror.classList.remove('active');
        h2.classList.remove('active');
        messageerror.classList.remove('anima');
        h2.classList.remove('anima');
    }, time);
}

function valoresDaApi(valor){

    if(img.classList.contains('active') && cidade.classList.contains('active') && temperatura.classList.contains('active') && vento.classList.contains('active')){
        img.classList.remove('active');
        cidade.classList.remove('active');
        temperatura.classList.remove('active');
        vento.classList.remove('active');
        infoImage.classList.remove('active');
    }

    container.classList.add('active');
    resultado.classList.add('active');
    
    setTimeout(() => {
        img.classList.add('active');
        cidade.classList.add('active');
        temperatura.classList.add('active');
        vento.classList.add('active');
        infoImage.classList.add('active');
    }, 800);

    setTimeout(() => {
        cidade.innerHTML = `${valor.name}, ${valor.sys.country}`;
        temperatura.innerHTML = `${Math.floor(valor.main.temp)} C°`;
        vento.innerHTML = `<img src="img/icon-vento-1.png" id="img-vento">${valor.wind.speed} Km/h`;
        infoImage.innerHTML = `${valor.weather[0].description}`;
        img.src = `http://openweathermap.org/img/wn/${valor.weather[0].icon}@2x.png`;
    }, 700);

    search.value = ''
}

move.addEventListener('click', () => {
    move.classList.toggle('active');
    container.classList.toggle('active');
    resultado.classList.toggle('active');
});