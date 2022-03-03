import StackNavigator from "./src/navigation";
import { AuthProvider } from "./src/hooks/useAuth";
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigator/>
      </AuthProvider>
    </NavigationContainer>
  );
}

