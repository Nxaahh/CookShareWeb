import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyC0cfTmaqsbSRMqPSklwkyS_NL_pQ4XbMk",
      authDomain: "cookshare2-fa2ff.firebaseapp.com",
      databaseURL: "https://cookshare2-fa2ff-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "cookshare2-fa2ff",
      storageBucket: "cookshare2-fa2ff.appspot.com",
      messagingSenderId: "218177580225",
      appId: "1:218177580225:web:56d5b5b9bee7e96c6a7840",
      measurementId: "G-4Q51LZ8XKK"
    })),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase())
  ]
};
