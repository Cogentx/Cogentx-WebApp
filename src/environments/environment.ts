// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  storageKeys: {
    tutorialCompleteKey: 'tutorialComplete',
    authRedirectKey: 'authRedirect',
  },
  firebase: {
    apiKey: 'AIzaSyDV7KRqzWnZEsZPvhoT8Ww0Mwa2hOfer3c',
    authDomain: 'cogentx-360ai-app.firebaseapp.com',
    databaseURL: 'https://cogentx-360ai-app.firebaseio.com',
    projectId: 'cogentx-360ai-app',
    storageBucket: 'cogentx-360ai-app.appspot.com',
    messagingSenderId: '99012026996',
    appId: '1:99012026996:web:d7ad0d17bae269ad'
  },
  fsCollections: {
    todos: 'todos',
    users: 'users',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
