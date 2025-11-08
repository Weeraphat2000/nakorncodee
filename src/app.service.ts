import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello NakornCode!';
  }

  hello(name: string): string {
    return `Hello, ${name}!`;
  }
}
