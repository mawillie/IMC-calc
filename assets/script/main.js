

/* ==== GERAL ========================== */

const body = document.querySelector("body");
const logo = document.querySelector(".logo");
const check = document.querySelector(".switcher__checkbox");

const card = document.querySelector(".imc");
const output = document.querySelector(".output");
const statos = document.querySelector(".status");


/* ==== THEME SWITCHER ========================== */


window.addEventListener('DOMContentLoaded', function() {
    const checkColorMode = JSON.parse(localStorage.getItem('color-mode'))

    if (checkColorMode) {
        check.checked = true

        modeSwitcher('darkmode')
    } 
})

check.addEventListener('change', function() {

    if (this.checked) {
        modeSwitcher('darkmode')
    }  else {
        modeSwitcher('lightmode')
    }

    localStorage.setItem('color-mode', this.checked)
})

function modeSwitcher(theme) {
    body.classList.toggle("dark");

    if (theme === 'darkmode') {
        logo.setAttribute(`src`, `./assets/images/logo--darkmode.svg`);
    } 
    
    if (theme === 'lightmode') {
        logo.setAttribute("src", "./assets/images/logo.svg");
    }
}


/* ==== IMC ========================== */


function calculaImc(peso, altura) {
    let resultado = (peso / altura ** 2).toFixed(1);

    if (isNaN(resultado) || peso <= 0 || altura <= 0) {
        return ["-1", "Valores inválidos", "imc"];

    } else if (resultado < 18.5) {
        return [resultado, "Abaixo do peso", "imc yellow"];

    } else if (resultado >= 18.5 && resultado <= 24.9) {
        return [resultado, "Normal", "imc green"];

    } else if (resultado >= 25.0 && resultado <= 29.9) {
        return [resultado, "Sobrepeso", "imc yellow"];

    } else if (resultado >= 30.0 && resultado <= 34.9) {
        return [resultado, "Obesidade Grau I", "imc red"];

    } else if (resultado >= 35.0 && resultado <= 39.9) {
        return [resultado, "Obesidade Grau II", "imc red"];

    } else if (resultado >= 40.0) {
        return [resultado, "Obesidade Grau III", "imc red"];
    }
}

function recebeImc(e) {
    e.preventDefault();

    const peso = document.querySelector('[name="peso"]').value;
    const altura = document.querySelector('[name="altura"]').value / 100;

    let [result, stats, classes] = calculaImc(peso, altura);

    output.textContent = `${result}`;
    statos.textContent = `${stats}`;
    card.className = classes;
}
