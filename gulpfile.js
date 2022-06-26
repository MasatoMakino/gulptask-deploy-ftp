/**
 * gulptask-deploy-ftpを利用するgulpfile.jsのサンプルです。
 **/

const os = require("os");
const path = require("path");

const { staging, deploy } = require("./bin").generateTasks({
  authFilePath: path.resolve(os.homedir(), ".ftp_auth", "example.auth.json"),
  root: "./build",
});

exports.staging = staging;
