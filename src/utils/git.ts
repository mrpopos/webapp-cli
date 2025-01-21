import { simpleGit, SimpleGitOptions } from "simple-git";
const createLogger = require("progress-estimator");
import chalk from "chalk";
// import cliSpinners from "cli-spinners";

const logger = createLogger({
  // spinner: cliSpinners.dots,
  spinner: {
    interval: 80, // The interval (in ms) between each spin.
    frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"], // The frames to use for the spinner.
  },
  logger: console,
  // theme: {
  //   // 自定义主题
  //   info: "cyan",
  //   error: "red",
  //   success: "green",
  //   warning: "yellow",
  // },
});

const gitOptions: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(), // 默认当前目录作为仓库目录
  binary: "git", // 使用https协议克隆仓库
  maxConcurrentProcesses: 6, // 同时运行的并发进程数
  trimmed: false, // 默认不剪切
};

export async function clone(repository: string, pName: string, options: string[]) {
  const git = simpleGit(gitOptions);
  try {
    await logger(git.clone(repository, pName, options), "clone repository from remote repository...", {
      estimate: 10000, // 预计耗时，单位为毫秒
    });
    console.log(chalk.green("clone repository success"));
    console.log();
    console.log(chalk.yellow("cd <your-project>"));
    console.log(chalk.yellow("npm install"));
    console.log(chalk.yellow("npm run dev"));
    console.log(chalk.blueBright("when you are done, run `npm run build` to compile your project."));
  } catch (e) {
    /* handle all errors here */
    console.log(chalk.red("clone repository error"), e);
  }
}
