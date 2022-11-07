const fs = require('fs');
const path = require('path');

const { stdout } = process;
const output = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8');

let readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Hello! File "text.txt" was successfully created. Please, enter some text:\n>'
});
rl.prompt();
rl.on('line', (input) => {
  if (input == "exit") {
    rl.close();
  };
  output.write(input);
});
process.on('exit', () => console.log());
process.on('exit', () => stdout.write('Have a Good Time!'));