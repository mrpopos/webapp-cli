import { Command } from "commander";
import { create } from "./command/create";
import { version } from "../package.json"

const program = new Command();

program.name("cli").version(version);

program
  .command("create")
  .description("create a new project")
  .action(() => {
    console.log("start to create project...");
    create();
  });

program.parse();
