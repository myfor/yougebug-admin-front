import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTOR_PROVIDERS } from './interceptors/barrel';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ThemeModule } from './theme/theme.module';
import { RoutesModule } from './routes/routes.module';
import { AppComponent } from './app.component';

import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';

import { DefaultInterceptor } from '@core';
import { StartupService } from '@core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
export function StartupServiceFactory(startupService: StartupService) {
  return () => startupService.load();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    ThemeModule,
    RoutesModule,
    BrowserAnimationsModule,
    MarkdownModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
    StartupService,
    {
      provide: APP_INITIALIZER,
      useFactory: StartupServiceFactory,
      deps: [StartupService],
      multi: true,
    },
    HTTP_INTERCEPTOR_PROVIDERS
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
