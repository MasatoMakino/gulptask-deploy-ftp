"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
var Option_1 = require("./Option");
var FtpDeploy = require("ftp-deploy");
var ftpDeploy = new FtpDeploy();
function get(option) {
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
exports.get = get;
var runFTP = function (option) {
    ftpDeploy.on("upload-error", function (data) {
        console.log(data.err);
    });
    return ftpDeploy.deploy(option);
};
//# sourceMappingURL=index.js.map