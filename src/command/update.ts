import process from "child_process";
import chalk from "chalk";
import ora from "ora";

export function update() {
  const spinner = ora({
    text: "npm install -g yys-app-cli",
    spinner: {
      frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"].map((item) => chalk.green(item)),
      interval: 50, // Optional
    },
    color: "yellow",
  });
  spinner.start();

  process.exec("npm install -g yys-app-cli", (error, stdout, stderr) => {
    spinner.stop();
    if (!error) {
      console.log(chalk.green("更新成功"));
    } else {
      console.log(chalk.red("更新失败"));
    }
  });
}
