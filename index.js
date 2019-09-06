/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import bgMessaging from './src/bgMessaging'; // <-- Import the file you created in (2)

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// Current main application


AppRegistry.registerComponent(appName, () => App);

AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);
