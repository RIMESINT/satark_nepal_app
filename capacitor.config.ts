import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.satarknepal.app',
  appName: 'Satark Nepal',
  webDir: 'www',
  bundledWebRuntime: false,
  "plugins": {
    "SplashScreen": {
      "launchAutoHide": false,
      "showSpinner": true
    }
  }
};


export default config;
