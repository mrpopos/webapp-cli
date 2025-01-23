import logSymbols from "log-symbols";
// import figlet from "figlet";
import chalk from "chalk";
import { redBright } from './../../node_modules/yoctocolors/base.d';
const figlet = require("figlet");

export const log = {
  info: (message: string) => {
    console.log(logSymbols.info, message);
  },
  error: (message: string) => {
    console.log(logSymbols.error, message);
  },
  success: (message: string) => {
    console.log(logSymbols.success, message);
  },
  warn: (message: string) => {
    console.log(logSymbols.warning, message);
  },
};

export const printCLILogo = (name: string) => {
  try {
    figlet(name, function (err: any, data: any) {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
      }
      console.log(chalk.blueBright(data))
    });
  } catch (err) {
    console.log("Something went wrong...");
    console.dir(err);
  }
};
