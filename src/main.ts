import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { importProvidersFrom, isDevMode } from '@angular/core';
import { AppComponent } from './app/app.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideServiceWorker } from '@angular/service-worker';


bootstrapApplication(AppComponent, {
    providers: [
    importProvidersFrom(BrowserModule, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule),
    provideAnimations(),
    provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    })
]
})
  .catch(err => console.error(err));
