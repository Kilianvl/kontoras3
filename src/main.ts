import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from './app/app.translate-loader';
import './icons';

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: TranslateModule,
      useFactory: HttpLoaderFactory,
      deps: []
    },
    appConfig.providers
  ],
}).catch((err) =>
  console.error(err)
);
