const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question(`Type $help to view all the commands\n`, (r) => {
  let code = null

    if(r === '$run'){
      console.log("ERROR You must type some code in order to execute it")
    } else

    if(r === '$clear'){
        console.clear()
        console.log('Type $help to view all the commands')
        code = ''
    } else

    if(r === '$help'){
        console.log(
          "$clear - Clears the console and removes all the previous typed code\n"+
          "$run - Executes the written code\n"
        )
    } else

    {
      code = r
      .replace(/console\.log\('/g,'console.log("\x1b[33m%s\x1b[0m",\'> ')
      .replace(/console\.log\("/g,'console.log("\x1b[33m%s\x1b[0m","> ')
      .replace(/console\.log\(`/g,'console.log("\x1b[33m%s\x1b[0m",`> ')
    }

  rl.on('line', x => {
      if(x === '$run'){
        try {
          if(code == null || code.length < 1) return console.log("ERROR No code was provided to run")

          let evaled = eval(code);
          if(code.toLowerCase().startsWith("message")) return evaled
          if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);

        } catch (err) {
          console.log("\x1b[33m%s\x1b[0m",`Error: ${err}`);
        }
          } else
            if(x === '$clear'){
            console.clear()
            console.log('Type $help to view all the commands')
            code = ''
        } else
            if(x === '$help'){
            console.log(
            "$clear - Clears the console and removes all the previous typed code\n"+
            "$run - Executes the written code\n"
        )
            } else

            {
            code = `${code}\n${x
              .replace(/console\.log\('/g,'console.log("\x1b[33m%s\x1b[0m",\'> ')
              .replace(/console\.log\("/g,'console.log("\x1b[33m%s\x1b[0m","> ')
              .replace(/console\.log\(`/g,'console.log("\x1b[33m%s\x1b[0m",`> ')
            }`
        }
    });
})