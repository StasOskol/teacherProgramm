let a = 5;

console.log(a);

let timeElement;

let btn = document.querySelector('#tre');

let inp = document.getElementById('inp');

let txt = document.querySelector('#text');

let btnAll = document.querySelectorAll('.rew');

console.log(btn);
console.log(btnAll);

console.log(btnAll[3]);

debugger

let start = () => {
    timeElement = setInterval(() => {
        a++;
        txt.innerHTML = a + 1;
    }, 500)
}


btnAll[3].style.background = 'yellow';

debugger

btn.addEventListener('click', Name)

inp.addEventListener('input', () => {
    txt.innerHTML = inp.value;

    txt.style.background = 'aqua'
})

function Name() {
    start();
}

let NewName = () => {
    console.log('Ree');
}

btnAll[3].addEventListener('click', () => {
    clearInterval(timeElement);
})