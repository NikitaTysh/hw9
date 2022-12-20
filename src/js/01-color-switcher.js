// const btn = document.querySelectorAll('button')
// btn.forEach(e=>e.addEventListener('click',onClick))
// function onClick(e)
// {
//    if(e.target.attributes[1] === 'data-stop')
//    {

//    }
// }
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const body = document.querySelector('body');
const btnSrt = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
btnSrt.addEventListener('click', onClick);
btnStop.addEventListener('click', onClick);
let intervalId;
function onClick(e) {
  if (e.target.attributes[1].name === 'data-start') {
    intervalId = setInterval(() => {
      body.style.background = getRandomHexColor();
    }, 1000);
    btnSrt.setAttribute('disabled', '');
  } else if (e.target.attributes[1].name === 'data-stop') {
    btnSrt.removeAttribute('disabled');
    clearInterval(intervalId);
  }
}
