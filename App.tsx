import React from 'react';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {ThemeProvider, useTheme} from '@rneui/themed';
import {theme} from './src/theme';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';
import RootNavigator from './src/navigation';
import {persistor, store} from './src/redux';
import {Text} from 'react-native';
import {TextInput} from 'react-native';
import NotificationSetup from './src/functions/notification';

(Text as any).defaultProps = (Text as any).defaultProps || {};
(Text as any).defaultProps.allowFontScaling = false;
(TextInput as any).defaultProps = (TextInput as any).defaultProps || {};
(TextInput as any).defaultProps.allowFontScaling = false;

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <StatusBar translucent backgroundColor={'transparent'} />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={theme}>
              <BottomSheetModalProvider>
                <NotificationSetup />
                <FlipperAsyncStorage />
                <RootNavigator />
              </BottomSheetModalProvider>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
