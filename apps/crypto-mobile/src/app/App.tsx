import ApplicationNavigator from '@/navigators/Application/ApplicationNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ApplicationNavigator />
    </GestureHandlerRootView>
  );
};

export default App;
