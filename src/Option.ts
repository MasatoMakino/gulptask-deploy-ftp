import * as path from "path";

/**
 * Auth JSONファイルのインターフェース
 */
interface AuthOption {
  user: string;
  password: string;
  host: string;
  remoteRoot: string;
  port?: number;
}

/**
 * タスク取得オプション
 */
export interface Option {
  authFilePath: string;
  stagingDir?: string;
  root?: string;
  exclude?: string[]; // 除外ファイル
}

/**
 * Optionのデフォルト値
 */
export class OptionDefault {
  static readonly stagingDir = "staging";
  static readonly exclude = [
    ".git/**",
    ".gitignore",
    "node_modules/**",
    "**/*/.DS_Store",
    "**/*/rev-manifest.json",
  ];
}

export interface FTPDeployOption extends AuthOption {
  localRoot: string;
  include?: string[];
  exclude: string[];
  forcePasv: boolean;
}

export class OptionInitializer {
  public static init(option: Option): Option {
    option.root = option.root ?? "dist";
    option.root = path.resolve(process.cwd(), option.root);
    option.stagingDir = option.stagingDir ?? OptionDefault.stagingDir;
    option.exclude = option.exclude ?? OptionDefault.exclude;
    return option;
  }

  public static getStagingOption(option: Option): FTPDeployOption {
    const auth = this.getAuth(option);
    return {
      ...auth,
      localRoot: option.root,
      remoteRoot: path.posix.join(auth.remoteRoot, option.stagingDir),
      include: ["*"],
      exclude: [...option.exclude, ".htaccess"],
      forcePasv: true,
    };
  }

  public static getDeployOption(option: Option): FTPDeployOption {
    const auth = this.getAuth(option);
    return {
      ...auth,
      localRoot: option.root,
      include: ["*"],
      exclude: option.exclude,
      forcePasv: true,
    };
  }

  static getAuth(option: Option): AuthOption {
    const auth: AuthOption = require(option.authFilePath);

    if (auth.user == null) {
      console.warn("FTPユーザーが設定されていません");
      return null;
    }
    if (auth.password == null) {
      console.warn("FTPパスワードが設定されていません");
      return null;
    }
    if (auth.host == null) {
      console.warn("FTPホストが設定されていません");
      return null;
    }
    if (auth.remoteRoot == null) {
      console.warn("リモートルートパスが設定されていません");
      return null;
    }

    return auth;
  }
}
