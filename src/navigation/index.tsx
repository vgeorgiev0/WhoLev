import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FeedScreen from "../screens/FeedScreen";
import CreatePostScreen from "../screens/CreatePostScreen";

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Feed"
          component={FeedScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Create Post" component={CreatePostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
