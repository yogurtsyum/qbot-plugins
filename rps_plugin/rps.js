exports.run = async (client, message, args) => {
  
  if(!args[0]) {
    return message.channel.send("Please input an option.")
  }
  
  let userChoice = args[0].toLowerCase();
  var number = Math.round(Math.random() * 3)
  let computerChoice
  
  if(number == 1)
  {
    computerChoice = "rock"
  }
  else if(number == 2)
  {
    computerChoice = "paper"
  }
  else
  {
    computerChoice = "scissors"
  }
  
  if(userChoice == "rock" && computerChoice == "paper")
  {
    return message.channel.send(`You have lost! You chose ${userChoice} while I chose ${computerChoice}.`)
  }
  else if(userChoice == "paper" && computerChoice == "rock")
  {
    return message.channel.send(`You have won! You chose ${userChoice} while I chose ${computerChoice}.`)
  }
  else if(userChoice == "paper" && computerChoice == "scissors")
  {
    return message.channel.send(`You have lost! You chose ${userChoice} while I chose ${computerChoice}.`)
  }
  else if(userChoice == "scissors" && computerChoice == "paper")
  {
    return message.channel.send(`You have won! You chose ${userChoice} while I chose ${computerChoice}.`)
  }
  else if(userChoice == "rock" && computerChoice == "scissors")
  {
    return message.channel.send(`You have won! You chose ${userChoice} while I chose ${computerChoice}.`)
  }
  else if(userChoice == "rock" && computerChoice == "scissors")
  {
    return message.channel.send(`You have lost! You chose ${userChoice} while I chose ${computerChoice}.`)
  }
  else if(userChoice == "rock" && computerChoice == "rock")
  {
      return message.channel.send("TIE!")
  }
  else if(userChoice == "paper" && computerChoice == "paper")
  {
      return message.channel.send("TIE!")
  }
  else if(userChoice == "scissors" && computerChoice == "scissors")
  {
      return message.channel.send("TIE!")
  }
}
