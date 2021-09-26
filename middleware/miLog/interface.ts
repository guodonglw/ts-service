interface cheese {
  type: String,
  filename: String,
  pattern: '-yyyy-MM-dd.log',
  alwaysIncludePattern: true
}

export interface appenders {
  cheese: cheese
}

export interface baseInfo {
  appLogLevel: string,
  dir: string,
  env: string,
  projectName: string,
  serverIp: string
}

export interface contextLogger {
  debug(msg: string): void,
  info(msg: string): void,
  error(msg: string): void
}