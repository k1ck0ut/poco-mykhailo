let number1
let number2
let number3
let number4
let number5
do {
    number1 = Number(window.prompt("Input first number: "));
}while (isNaN(number1) || number1 <= 0);

do {
    number2 = Number(window.prompt("Input second number: "));
}while (isNaN(number2) || number2 <= 0);

do {
    number3 = Number(window.prompt("Input third number: "));
}while (isNaN(number3) || number3 <= 0);

do {
    number4 = Number(window.prompt("Input fourth number: "));
}while (isNaN(number4) || number4 <= 0);

do {
    number5 = Number(window.prompt("Input fifth number: "));
}while (isNaN(number5) || number5 <= 0);

    let Sum = number1 + number2 + number3 + number4 + number5
    let avg = Sum / 5
    alert ("Sum of your numbers is: " + Sum + " and avg of your numbers is: " + avg)
