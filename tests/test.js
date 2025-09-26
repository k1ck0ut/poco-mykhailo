  let number = Number(prompt("pls enter nmbr: "));

  if (isNaN(number)){
      console.log ("This is not a number")
  }   
  
  else if (number %2 === 0){
  console.log ("The number is even")
  }
  else if (number %2 != 0) {
  console.log ("The number is odd")
  }
