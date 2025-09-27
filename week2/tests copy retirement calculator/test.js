let age
let retirementAge
let currentYear = 2025

do {
age = prompt("Enter your age: ");
retirementAge = prompt("Enter your retirement age: ");

}while (age >= retirementAge);
let retirementYear1 = currentYear+ +retirementAge - +age;
let retirementAge1 = +retirementAge - +age;

alert( "Your retitement year is: " + retirementYear1 + " and you have " + retirementAge1 + " years left until you can retire");