import { NgModule, CUSTOM_ELEMENTS_SCHEMA, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'; // Importa MatIconModule
import { GoogleMapsModule } from '@angular/google-maps';
import { LoginModule } from './login/login.module';
import { AdminModule } from './login/admin.module';
import { RoleGuard } from './login/guards/role.guard';
import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatIconModule, // Agrega MatIconModule a los imports
    GoogleMapsModule,
    LoginModule,
    AdminModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:1000'
    })
  ],
  providers: [RoleGuard],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { 
  constructor() {
    // Verifica si el navegador soporta Service Workers y registra el personalizado
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.js')
        .then(reg => console.log('Custom Service Worker registrado:', reg))
        .catch(err => console.error('Error al registrar el Custom Service Worker:', err));
    }
  }
}
