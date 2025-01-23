import { Command } from "commander";
import { create } from "./command/create";
import { update } from "./command/update";
import { version } from "../package.json";

const program = new Command();

program.name("cli").version(version, "-v --version");

program
  .command("create")
  .description("create a new project")
  .action(() => {
    console.log("start to create project...");
    create();
  });

program
  .command("update")
  .description("更新脚手架yys-app-cli")
  .action(() => {
    update();
  });

program.parse();
