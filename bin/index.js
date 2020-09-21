"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTasks = exports.get = void 0;
var Option_1 = require("./Option");
var FtpDeploy = require("ftp-deploy");
var ftpDeploy = new FtpDeploy();
/**
 * @deprecated Use generateTasks
 * @param option
 */
function get(option) {
    return generateTasks(option);
}
exports.get = get;
/**
 *
 * @param option
 */
function generateTasks(option) {
    option = Option_1.OptionInitializer.init(option);
    var staging = function () {
        var opt = Option_1.OptionInitializer.getStagingOption(option);
        return runFTP(opt);
    };
    var deploy = function () {
        var opt = Option_1.OptionInitializer.getDeployOption(option);
        return runFTP(opt);
    };
    return {
        staging: staging,
        deploy: deploy,
    };
}
exports.generateTasks = generateTasks;
var runFTP = function (option) {
    ftpDeploy.on("upload-error", function (data) {
        console.log(data.err);
    });
    return ftpDeploy.deploy(option);
};
//# sourceMappingURL=index.js.map