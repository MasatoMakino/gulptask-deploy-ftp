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
    exclude?: string[];
}
/**
 * Optionのデフォルト値
 */
export declare class OptionDefault {
    static readonly stagingDir = "staging";
    static readonly exclude: string[];
}
export interface FTPDeployOption extends AuthOption {
    localRoot: string;
    include?: string[];
    exclude: string[];
    forcePasv: boolean;
}
export declare class OptionInitializer {
    static init(option: Option): Option;
    static getStagingOption(option: Option): FTPDeployOption;
    static getDeployOption(option: Option): FTPDeployOption;
    static getAuth(option: Option): AuthOption;
}
export {};
