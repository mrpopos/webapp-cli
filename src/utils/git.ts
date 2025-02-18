import { simpleGit, SimpleGitOptions } from "simple-git";
import createLogger from "progress-estimator";
import chalk from "chalk";
// import cliSpinners from "cli-spinners";
import { log, printCLILogo } from "../utils/log";

const logger = createLogger({
  // spinner: cliSpinners.dots,
  spinner: {
    interval: 80, // The interval (in ms) between each spin.
    frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"], // The frames to use for the spinner.
  },
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
    log.success("clone repository success");

    console.log();
    log.info(chalk.yellow(" cd <your-project>"));
    log.info(chalk.yellow(" npm install"));
    log.info(chalk.yellow(" npm run dev"));
    console.log(chalk.blueBright("when you are done, run `npm run build` to compile your project."));

    // figlet
    printCLILogo("yys-app-cli");
  } catch (e) {
    /* handle all errors here */
    log.error(chalk.red("clone repository error"));
  }
}
