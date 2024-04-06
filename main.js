#! /usr/bin/env node
//==== ATM Machine Project ====//
import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 10000;
let myPin = 3456;
//Print to the welcome message
console.log(chalk.bgBlue.bold("\n\t Hello! Welcome to my ATM-Machine Project \t\n"));
let pinAns = await inquirer.prompt({
    name: "pin",
    type: "number",
    message: chalk.yellow("Enter your pin code:"),
});
if (pinAns.pin === myPin) {
    console.log(chalk.green(`\n\t Your Pin Code is Correct, Login Successfully!\n`));
    let operationsAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: chalk.yellow("Select an operation:"),
            choices: ["Withdraw Amount", "Check Balance"],
        },
    ]);
    if (operationsAns.operation === "Withdraw Amount") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: chalk.yellow("Select a withdrawal method"),
                choices: ["Fast Cash", "Enter Amount"],
            },
        ]);
        if (withdrawAns.withdrawMethod === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: chalk.yellow("Select Amount"),
                    choices: [1000, 2000, 3000, 5000, 10000, 20000, 50000],
                },
            ]);
            if (fastCashAns.fastCash > myBalance) {
                console.log(chalk.red.bold(`Insufficient Balance!`));
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(`${chalk.green.bold(fastCashAns.fastCash)}` + chalk.whiteBright.italic ` Withdraw Successfully!`);
                console.log(chalk.whiteBright.italic `Your remaining balance is ${chalk.green.bold(myBalance)}`);
            }
        }
        else if (withdrawAns.withdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: chalk.yellow("Enter the amount of withdraw:"),
                },
            ]);
            if (amountAns.amount > myBalance) {
                console.log(chalk.red.bold(`Insufficient Balance!`));
            }
            else {
                myBalance -= amountAns.amount;
                console.log(`${chalk.green.bold(amountAns.amount)}` + chalk.whiteBright.italic ` Withdraw Successfully!`);
                console.log(chalk.whiteBright.italic `Your remaining balance is ${chalk.green.bold(myBalance)}`);
            }
        }
    }
    else if (operationsAns.operation === "Check Balance") {
        console.log(chalk.whiteBright.italic `Your account balance is ${chalk.green.bold(myBalance)}`);
    }
}
else {
    console.log(chalk.red.bold(`Your Pin Code is Incorrect, Try Again!`));
}
