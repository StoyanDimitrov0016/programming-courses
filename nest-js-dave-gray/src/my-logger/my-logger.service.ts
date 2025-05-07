import { Injectable, ConsoleLogger } from '@nestjs/common';
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';
import * as path from 'path';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  private readonly folderPath = path.join(__dirname, '..', '..', 'logs');
  private readonly filePath = path.join(this.folderPath, 'my-logs.log');

  private async ensureLogFolderExists() {
    console.log(fs.existsSync(this.folderPath));
    if (!fs.existsSync(this.folderPath)) {
      await fsPromises.mkdir(this.folderPath);
    }
  }

  private async appendLog(entry: string) {
    const timestamp = Intl.DateTimeFormat('bg-BG', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'Europe/Sofia',
    }).format(new Date());
    const formattedEntry = `${timestamp}\t${entry}\n`;

    await this.ensureLogFolderExists();
    await fsPromises.appendFile(this.filePath, formattedEntry);
  }

  log(message: any, context?: string): void {
    const entry = `${context}\t${message}`;
    this.appendLog(entry);
    super.log(message, context);
  }

  error(message: any, stackOrContext?: string): void {
    const entry = `${stackOrContext}\t${message}`;
    this.appendLog(entry);
    super.error(message, stackOrContext);
  }
}
