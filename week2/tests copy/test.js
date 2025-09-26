let fuel
let astronauts
let km = 0
do {
  fuel = prompt("Enter fuel: max 30.000")

}while ( fuel < 5000 || fuel > 30001);

do {
  astronauts = prompt ("Enter astronauts max. 7: ")

} while (astronauts > 7 || astronauts < 1);

while (fuel >= astronauts*100)
{
fuel = fuel - astronauts*100;
km = km + 50
console.log (fuel, km, "starting the game")
}