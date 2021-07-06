/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.setLanguage('ar');
  }

  setLanguage(lang: string){
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
  }
}
