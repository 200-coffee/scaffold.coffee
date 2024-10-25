import chalk from 'chalk';

export const logger = {
  error(...args: unknown[]) {
    console.log(chalk.red(...args));
  },
  warn(...args: unknown[]) {
    console.log(chalk.yellow(...args));
  },
  info(...args: unknown[]) {
    console.log(chalk.cyan(...args));
  },
  success(...args: unknown[]) {
    console.log(chalk.green(...args));
  },
  message(...args: unknown[]) {
    console.log(chalk.visible(...args));
  },
  break() {
    console.log('');
  },
  welcome() {
    console.log(
      chalk.blueBright(`                                 
 _____         ___ ___     _   _ 
|   __|___ ___|  _|  _|___| |_| |
|__   |  _| .'|  _|  _| . | | . |
|_____|___|__,|_| |_| |___|_|___|
                                 `),
    );
    console.log('');
  },
};