var
    chalk = require("chalk"),
    figlet = require('figlet')
;

var text =
    chalk.blue.bold(
        figlet.textSync('commander-gulp-mailing', {

            horizontalLayout: "fitted",
            verticalLayout: "default"
        })
    )

console.log(text)