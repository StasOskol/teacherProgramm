let inputs = document.querySelectorAll('.inp');
console.log(inputs);
let button = document.querySelector('.button');
let res = document.querySelector('#res');

button.addEventListener('click', () => {
    const mainDeter = inputs[0].value * inputs[4].value -  inputs[1].value * inputs[3].value;
    const XDeter = inputs[2].value * inputs[4].value - inputs[1].value * inputs[5].value;
    const YDeter = inputs[0].value * inputs[5].value - inputs[3].value * inputs[2].value;

    const X = XDeter / mainDeter;
    const Y = YDeter / mainDeter;

    res.innerHTML = "X: " + X + "Y: " + Y;
})