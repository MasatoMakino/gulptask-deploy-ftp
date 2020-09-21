import { FTPDeployOption, Option, OptionInitializer } from "./Option";
const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();

/**
 * @deprecated Use generateTasks
 * @param option
 */
export function get(option: Option) {
  return generateTasks(option);
}

/**
 *
 * @param option
 */
export function generateTasks(option: Option) {
  option = OptionInitializer.init(option);

  const staging = () => {
    const opt = OptionInitializer.getStagingOption(option);
    return runFTP(opt);
  };

  const deploy = () => {
    const opt = OptionInitializer.getDeployOption(option);
    return runFTP(opt);
  };

  return {
    staging,
    deploy,
  };
}

const runFTP = (option: FTPDeployOption) => {
  ftpDeploy.on("upload-error", function (data) {
    console.log(data.err);
  });
  return ftpDeploy.deploy(option);
};
