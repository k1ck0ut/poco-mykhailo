let currency = 0
let CPU = 0
let upg = [];

for (i=0; i<10; i++) {
    upg.push(() => console.log(i)); // push into upg arr
}

addEventListener("click", () => { currency += 1; console.log(currency)}); //clicker + counter in console


    
console.log(upg[0]())
