const body = document.getElementById("body");
const hidden = document.querySelector('.hidden');
const chose = document.getElementById("chose");
const optionButton = document.querySelectorAll('.option');

const allergologia = document.querySelector('.allergologia');
const dermatologia = document.querySelector('.dermatologia');
const ematologia = document.querySelector('.ematologia');
const oculistica = document.querySelector('.oculistica');
const oncologia = document.querySelector('.oncologia');
const pneumologia = document.querySelector('.pneumologia');
const cardiologia = document.querySelector('.cardiologia');
const cardiochirurgia = document.querySelector('.cardiochirurgia');
const chirurgiaPlastica = document.querySelector('.chirurgia-plastica');
const ginecologia = document.querySelector('.ginecologia');
const malattieInfettive = document.querySelector('.malattie-infettive');
const nefrologia = document.querySelector('.nefrologia');
const neurologia = document.querySelector('.neurologia');
const ortopedia = document.querySelector('.ortopedia');
const ostetricia = document.querySelector('.ostetricia');
const psichiatria = document.querySelector('.psichiatria');
const radioterapia = document.querySelector('.radioterapia');
const urologia = document.querySelector('.urologia');
const servizioDietetico = document.querySelector('.servizio-dietetico');
const chiesa = document.querySelector('.chiesa');

const chosenOption = document.querySelector('.chosen-option');
const chosenOptionInfo = document.querySelector('.chosen-opzion-info');
const xButton = document.querySelector('.x');
const goToMap = document.querySelector('.go-to-map');
const infoButton = document.querySelector('.info-button');
const returnButtonInfo = document.querySelector('.return-info');
const description = document.querySelector('.description');
const returnButtonMap = document.querySelector('.return-map');
const returnButtonScan = document.querySelector('.scan');
const returnButtonIndex = document.querySelector('.return-index');
const map = document.querySelector('.map-space');

const apiUrl = './visite.json';
const nodiUrl = './nodi.json';


let option;
let prevCode;

allergologia.addEventListener('click', function() {
  chosenOption.innerHTML = allergologia.name;
  option = allergologia.name;
  localStorage.setItem("option", option);
  avvia();
});
dermatologia.addEventListener('click', function() {
  chosenOption.innerHTML = dermatologia.name;
  option = dermatologia.name;
  localStorage.setItem("option", option);
  avvia();
});
ematologia.addEventListener('click', function() {
  chosenOption.innerHTML = ematologia.name;
  option = ematologia.name;
  localStorage.setItem("option", option);
  avvia();
});
oculistica.addEventListener('click', function() {
  chosenOption.innerHTML = oculistica.name;
  option = oculistica.name;
  localStorage.setItem("option", option);
  avvia();
});
oncologia.addEventListener('click', function() {
  chosenOption.innerHTML = oncologia.name;
  option = oncologia.name;
  localStorage.setItem("option", option);
  avvia();
});
pneumologia.addEventListener('click', function() {
  chosenOption.innerHTML = pneumologia.name;
  option = pneumologia.name;
  localStorage.setItem("option", option);
  avvia();
});
cardiologia.addEventListener('click', function() {
  chosenOption.innerHTML = cardiologia.name;
  option = cardiologia.name;
  localStorage.setItem("option", option);
  avvia();
});
cardiochirurgia.addEventListener('click', function() {
  chosenOption.innerHTML = cardiochirurgia.name;
  option = cardiochirurgia.name;
  localStorage.setItem("option", option);
  avvia();
});
chirurgiaPlastica.addEventListener('click', function() {
  chosenOption.innerHTML = chirurgiaPlastica.name;
  option = chirurgiaPlastica.name;
  localStorage.setItem("option", option);
  avvia();
});
ginecologia.addEventListener('click', function() {
  chosenOption.innerHTML = ginecologia.name;
  option = ginecologia.name;
  localStorage.setItem("option", option);
  avvia();
});
malattieInfettive.addEventListener('click', function() {
  chosenOption.innerHTML = malattieInfettive.name;
  option = malattieInfettive.name;
  localStorage.setItem("option", option);
  avvia();
});
nefrologia.addEventListener('click', function() {
  chosenOption.innerHTML = nefrologia.name;
  option = nefrologia.name;
  localStorage.setItem("option", option);
  avvia();
});
neurologia.addEventListener('click', function() {
  chosenOption.innerHTML = neurologia.name;
  option = neurologia.name;
  localStorage.setItem("option", option);
  avvia();
});
ortopedia.addEventListener('click', function() {
  chosenOption.innerHTML = ortopedia.name;
  option = ortopedia.name;
  localStorage.setItem("option", option);
  avvia();
});
ostetricia.addEventListener('click', function() {
  chosenOption.innerHTML = ostetricia.name;
  option = ostetricia.name;
  localStorage.setItem("option", option);
  avvia();
});
psichiatria.addEventListener('click', function() {
  chosenOption.innerHTML = psichiatria.name;
  option = psichiatria.name;
  localStorage.setItem("option", option);
  avvia();
});
radioterapia.addEventListener('click', function() {
  chosenOption.innerHTML = radioterapia.name;
  option = radioterapia.name;
  localStorage.setItem("option", option);
  avvia();
});
urologia.addEventListener('click', function() {
  chosenOption.innerHTML = urologia.name;
  option = urologia.name;
  localStorage.setItem("option", option);
  avvia();
});
servizioDietetico.addEventListener('click', function() {
  chosenOption.innerHTML = servizioDietetico.name;
  option = servizioDietetico.name;
  localStorage.setItem("option", option);
  avvia();
});
chiesa.addEventListener('click', function() {
  chosenOption.innerHTML = chiesa.name;
  option = chiesa.name;
  localStorage.setItem("option", option);
  avvia();
});


xButton.addEventListener('click', exit);
goToMap.addEventListener('click', mappa);
infoButton.addEventListener('click', info);
returnButtonInfo.addEventListener('click', exit);
returnButtonMap.addEventListener('click', reload);

returnButtonScan.addEventListener('click', function () {
  window.location.href = "./map.html"
});

returnButtonIndex.addEventListener('click', function () {
  window.location.href = "./index.html"
});


function avvia() {
  body.classList.remove('hidden');
  chose.classList.add('chose');
}

function exit() {
  body.classList.remove('info');
  body.classList.remove('map');
  body.classList.add('hidden');
  chose.classList.remove('chose');
}

function mappa() {
  body.classList.add('map');
  chose.classList.remove('chose');
}

function reload() {
  window.location.reload();
}


function info() {
  body.classList.add('info');
  chose.classList.remove('chose');

  chosenOptionInfo.innerHTML = option;
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onload = function() {
    const dataBase = JSON.parse(this.responseText);
    console.log(dataBase);
    description.innerHTML = dataBase[`${option}`].descrizione;
  }
  xmlhttp.open("GET", apiUrl, true);
  xmlhttp.send();
}






function domReady(fn) {
  if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
  ) {
      setTimeout(fn, 1000);
  } else {
      document.addEventListener("DOMContentLoaded", fn);
  }
}

domReady(function () {

  // Se trova il QR code
  function onScanSuccess(decodeText, decodeResult) {
    console.log("You Qr is : " + decodeText, decodeResult);

    prevCode = decodeText;
    if (prevCode == decodeText) {
      option = localStorage.getItem("option");
      console.log(option);
      console.log('funziona');
      htmlscanner.clear();
      body.classList.remove('map');
      body.classList.add('scanned');
      mapImg();
    }
  }
  


  let htmlscanner = new Html5QrcodeScanner(
      "my-qr-reader",
      { fps: 10, qrbos: 250, rememberLastUsedCamera: false, camera2 : 0, facingMode: "environment"}
  );
  htmlscanner.render(onScanSuccess);

});


function mapImg() {

  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onload = function() {
    const dataBase = JSON.parse(this.responseText);
    console.log(dataBase);
    let nodeResult = dataBase[`${prevCode}`][`${option}`];
    let img = document.createElement('img');
    img.src = `/Piantina/${prevCode}-${nodeResult}.png`;
    map.appendChild(img);
    console.log(img);
  }
  xmlhttp.open("GET", nodiUrl, true);
  xmlhttp.send();
}
