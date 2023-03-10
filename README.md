# gulptask-deploy-ftp

> **Warning**
>
> This project has been archived. Please consider it as an alternative.
>
> [ftp-deploy](https://www.npmjs.com/package/ftp-deploy)
>
> [ftp-deploy-cli](https://www.npmjs.com/package/ftp-deploy-cli)

> Thin ftp-deploy wrapper for gulp.js

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
[![Build](https://github.com/MasatoMakino/gulptask-deploy-ftp/actions/workflows/buildJS.yml/badge.svg)](https://github.com/MasatoMakino/gulptask-deploy-ftp/actions/workflows/buildJS.yml)

## Getting Started

### Install

```bash
npm install --save-dev gulp
```

and

```bash
npm install --save-dev https://github.com/MasatoMakino/gulptask-deploy-ftp.git
```

### Run in gulpfile.js

The first step is to create an `auth.json` file.

```json
{
  "user": "user_name",
  "password": "password",
  "host": "host.name.example",
  "remoteRoot": "/dir/to/public_html",
  "port": 21
}
```

This file contains the FTP authentication information. In this example, this file is stored in `~/.ftp_auth/auth.json`.

The next step is to write `gulpfile.js`.

```js
const os = require("os");
const path = require("path");

const { deploy } = require("gulptask-deploy-ftp").generateTasks({
  authFilePath: path.resolve(os.homedir(), ".ftp_auth", "auth.json"),
});

exports.deploy = deploy;
```

`path.resolve(os.homedir(), ".ftp_auth", "auth.json")` points to `~/.ftp_auth/auth.json`

## License

[MIT licensed](LICENSE).
