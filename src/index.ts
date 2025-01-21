import { Command } from "commander";
import { create } from "./command/create";

const program = new Command();

program.name("cli").version("0.0.1");

program
  .command("create-web-app")
  .description("create a new project")
  .action(() => {
    console.log("start to create project...");
    create();
  });

program.parse();
