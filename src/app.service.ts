import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getTemplates() {
    return [
      { id: '1', name: 'template-1' },
      { id: '2', name: 'template-2' },
    ];
  }
}
