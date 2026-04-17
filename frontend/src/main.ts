import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { App } from './app/app';
import { routes } from './app/route/app.routes';

bootstrapApplication(App, {
  providers: [provideRouter(routes)],
});