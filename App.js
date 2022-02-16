import StackNavigator from "./src/navigation";
import { AuthProvider } from "./src/hooks/useAuth";
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigator/>
      </AuthProvider>
    </NavigationContainer>
  );
}

