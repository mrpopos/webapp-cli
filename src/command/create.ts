import { input, select } from "@inquirer/prompts";
import { clone } from "../utils/git";
import { checkDirExists, isCoverDir } from "../utils/file";
import fs from "node:fs/promises";
import { version } from "../../package.json";
import axios from "axios";
import chalk from "chalk";

interface ITemplateInfo {
  name: string;
  repository: string;
  branch: string;
  description: string;
}

export const templates: Map<string, ITemplateInfo> = new Map([
  [
    "vite-vue3-template",
    {
      name: "vite-vue3-template",
      repository: "https://gitee.com/mrpopos-wolton/vue3-dawei.git",
      branch: "master",
      description: "vite + vue3",
    },
  ],
  [
    "vite-vue3-ts-template",
    {
      name: "vite-vue3-ts-template",
      repository: "https://gitee.com/mrpopos-wolton/vue3-dawei.git",
      branch: "master",
      description: "vite + vue3 + ts",
    },
  ],
  [
    "vite-vue2-template",
    {
      name: "vite-vue2-template",
      repository: "https://gitee.com/mrpopos-wolton/vue3-dawei.git",
      branch: "master",
      description: "vite + vue2",
    },
  ],
  [
    "vite-vue2-ts-template",
    {
      name: "vite-vue2-ts-template",
      repository: "https://gitee.com/mrpopos-wolton/vue3-dawei.git",
      branch: "master",
      description: "vite + vue2 + ts",
    },
  ],
  [
    "vite-react-template",
    {
      name: "vite-react-template",
      repository: "https://gitee.com/mrpopos-wolton/vue3-dawei.git",
      branch: "master",
      description: "vite + react",
    },
  ],
  [
    "vite-react-ts-template",
    {
      name: "vite-react-ts-template",
      repository: "https://gitee.com/mrpopos-wolton/vue3-dawei.git",
      branch: "master",
      description: "vite + react + ts",
    },
  ],
]);

interface NpmPackageInfo {
  version: string;
}

const checkVersion = async (name: string, version: string) => {
  try {
    const res = await axios.get<NpmPackageInfo>(`https://registry.npmjs.org/${name}/latest`);
    return res.data.version === version;
  } catch (error) {
    return false;
  }
};

export const create = async () => {
  // 初始化模版列表
  // console.log("templates", templates);
  const templateList = Array.from(templates).map((item: [string, ITemplateInfo]) => {
    const [key, value] = item;
    return { name: value.name, value: key, description: value.description };
  });
  // 检测版本信息
  const vbersionBool = await checkVersion("yys-app-cli", version);
  if (!vbersionBool) {
    console.log(chalk.red(`当前版本为${version}，请更新到最新版本`));
    console.log(chalk.blueBright(`请执行以下命令更新：npm install -g yys-app-cli`));
    return;
  }
  // 输入项目名称
  const pName = await input({
    message: "Input project name: ",
  });
  // console.log("pName", pName);
  const exists = await checkDirExists(pName);
  console.log("exists", exists);
  if (exists) {
    const cover = await isCoverDir(pName);
    if (cover) {
      // 删除目录
      await fs.rm(pName, { recursive: true, force: true });
    } else {
      return;
    }
  }
  // 选择项目模版
  const pTemplate: string = await select({
    message: "Select project template",
    choices: templateList as any,
  });
  // 打印模版信息
  // console.log("pTemplate", pTemplate, templates.get(pTemplate));
  const selectedTemplate = templates.get(pTemplate);
  // 克隆项目
  if (selectedTemplate) {
    clone(selectedTemplate.repository, pName, ["-b", selectedTemplate.branch]);
  } else {
    console.log("模板不存在");
  }
};
