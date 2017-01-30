import {NgModule} from '@angular/core';
import {IonicApp, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ContactForm} from '../pages/contact-form/contact-form';

import {
    TranslateModule,
    TranslateService,
    TranslateLoader,
    TranslateStaticLoader,
    TranslatePipe
} from 'ng2-translate/ng2-translate';
import {Http} from "@angular/http";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ContactForm
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ContactForm
  ],
  providers: [TranslateService],
  pipes: [TranslatePipe]
})

export class AppModule {
}

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

