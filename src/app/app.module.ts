import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AuthTokenHttpInterceptorProvider } from './interceptors/auth.interceptor';
import { FormsModule } from '@angular/forms';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { StoreModule } from '@ngrx/store';
import { setDataReducer } from './reducers/setdata.reducer';
import { BUCKET } from '@angular/fire/storage';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

registerLocaleData(es);


@NgModule({
  declarations: [
    AppComponent,    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    StoreModule.forRoot({ data: setDataReducer }, {}),
    FontAwesomeModule
  ],
  providers: [
    AuthTokenHttpInterceptorProvider,
    { provide: NZ_I18N, useValue: es_ES },
    { provide: BUCKET, useValue: 'gs://mayra-chambilla.appspot.com' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
