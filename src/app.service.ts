import { Injectable } from '@nestjs/common';
import { PORT } from './main';

@Injectable()
export class AppService {
  getAppStatus(): string {
    return `Server is running! 🚀\n Please check http://localhost:${PORT}/api for Swagger docs...`;
  }
}
