const os = require("os");
const path = require("path");

const { staging, deploy } = require("./bin").get({
  authFilePath: path.resolve(os.homedir(), ".ftp_auth", "example.auth.json"),
  root: "./build",
});

exports.staging = staging;
