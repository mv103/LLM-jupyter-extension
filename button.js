// Header animation effect
var messageArray = ["Welcome to BugHero"];
var textPosition = 0;
var speed = 100;

typewriter = () => {
  document.querySelector("h1").innerHTML = messageArray[0].substring(0, textPosition);

  if(textPosition++ != messageArray[0].length) {
    setTimeout(typewriter, speed);
  }
}

window.addEventListener("load", typewriter);

// Call to API
async function apiCall() {
  // this is to take input as the prompt (from "error")
  let userQuestion = document.getElementById('error');
  let promptContext = "Can you detect the error in the following question and fix the code? ";
  let promptInput = promptContext + " " + userQuestion.value;

  const body = {
      'prompt': promptInput,
      'max_tokens': 300,
      'temperature': 1,
      'frequency_penalty': 0,
      'presence_penalty': 0,
      'top_p': 0.5,
      'stop': null
  };
  const response = await fetch('https://inferenceendpointeastus.openai.azure.com/openai/deployments/athena-code-davinci-002/completions?api-version=2022-06-01-preview', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          // hidden API key
          'api-key': '' 
      },
      body: JSON.stringify(body)
  }).then(response => response.json());

  console.log(body.prompt)
  console.log(response.choices[0])
  console.log(response.choices[0].text)

  // this is to output the prompt response
  // dialogue to acknowledge question
  let dialogue = ["Great", "Interesting", "Good", "Fantastic", "Neat"];
  let randIndex = Math.floor(Math.random() * dialogue.length);

  let outputText = document.getElementById('output');
  // outputText.innerHTML = dialogue[randIndex] + " Question!\n" + response.choices[0].text; // jupyter doesn't like new line
  //first ex
  // outputText.innerHTML = "Neat Question!" + '<br/>' + "Your code causes a <span class='err-type'>‘Syntax Error’.</span>" +
  //     " In Python, you use a ‘=’ to assign variables and use  ‘==’ to compare values. " +
  //     "For this comparison in a conditional statement, you should be using a double equals sign." + '<br/>' + '<br/>' +
  //     "Here is a suggested change: " + '<br/>' + "var <span class='code'>=</span> 10" + '<br/>' + '<span class="tab"></span>' + "if var <span class='code'>==</span> 10: " + '<br/>' +
  //     '<span class="tab"></span>' +  '<span class="tab"></span>' + " <span class='code'>print</span>('Hello!')" + '<br/>' + '<br/>' +
  //     "With this change, this code will check if the value of spam is equal to 42 and if it is, it will print \"Hello!\"."
  //second ex
  outputText.innerHTML = "Great Question!" + '<br/>' + "Your code causes a <span class='err-type'>‘Name Error’.</span>"
    + "The error message you received suggests that the 'math' module has not been imported in your code. "
    + '<br/>' + "In order to use the 'math' module and its functions, you need to import it at the beginning of your code. "
    + '<br/>' + '<br/>' + "Here's a suggested change: " + '<br/>' + "<span class='code'>import</span> math" + '<br/>'
    + "pie = <span class='code'>math</span>.pi" + '<br/>' + "<span class='code'>print</span>(\"The value of pi is : \", pie)"
    + '<br/>' + '<br/>' + "This will import the 'math' module and allow you to use its functions, such as 'pi'. "
    + '<br/>'
    + "Make sure that the module name is spelled correctly and that you have the module installed on your system if necessary."

}
