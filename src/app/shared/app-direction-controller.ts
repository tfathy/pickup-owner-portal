import { readStorage } from './shared-util';

export class AppDirectionController {
  public appDirection: string;
  constructor() {
    this.checkDirection();
  }
  public async checkDirection(): Promise<void> {
    const lang = readStorage('lang');
    if ((await lang) === 'ar') {
      this.appDirection = 'rtl';
    } else {
      this.appDirection = 'ltr';
    }
  }
}
