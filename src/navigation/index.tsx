import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FeedScreen from "../screens/FeedScreen";
import CreatePostScreen from "../screens/CreatePostScreen";
import ProfileScreen from "../screens/ProfileScreen";
import UpdateProfileScreen from "../screens/UpdateProfileScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Feed"
          component={FeedScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} options={{ title: 'Create a post' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={UpdateProfileScreen} options={{ title: 'Edit your profile' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
