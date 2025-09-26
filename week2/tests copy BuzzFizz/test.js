for (bebra = 1; bebra <= 100; bebra++) 
    if (bebra % 45 == 0){
        console.log("FizzBuzz")
    }
    else if (bebra % 5 == 0) {
        console.log("Buzz")
    }
    else if (bebra % 3 == 0) {
        console.log("Fizz")
    }
    else
        console.log(bebra)