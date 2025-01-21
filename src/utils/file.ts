// const path = require("path");
// const fs = require("fs").promises;
import path from "node:path";
import fs from "node:fs/promises";
import { select } from "@inquirer/prompts";

/**
 * 检查目录是否存在
 * @param name
 * @returns
 */
export async function checkDirExists(name: string): Promise<boolean> {
  let res = false;

  const dirPath = path.join(process.cwd(), name);
  try {
    await fs.access(dirPath);
    res = true;
  } catch (err) {
    res = false;
  }

  return res;
}

/**
 * 是否覆盖目录
 */
export async function isCoverDir(name: string): Promise<boolean> {
  const status: boolean = await select({
    message: "Do you want to cover the directory?",
    choices: [
      { name: "Yes", value: true },
      { name: "No", value: false },
    ],
  });
  return status;
}
