import { useEffect } from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FeedScreen from "../screens/FeedScreen";
import CreatePostScreen from "../screens/CreatePostScreen";
import ProfileScreen from "../screens/ProfileScreen";
import UpdateProfileScreen from "../screens/UpdateProfileScreen";
import FirstEditProfile from "../screens/FirstEditProfileScreen";
import { RecoilRoot } from 'recoil';
import { Auth, DataStore } from 'aws-amplify';
import { User } from '../models';
import { useRecoilState } from 'recoil'
import { dbUserAtom, subAtom } from '../state/user';

const Stack = createNativeStackNavigator<RootStackParamList>();


const Navigator = () => {
  const [sub, setSub] = useRecoilState(subAtom);
  const [user, setUser] = useRecoilState(dbUserAtom);


  const fetchUser = async () => {
    const authUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
    const dbUser = await DataStore.query(User, authUser.attributes.sub);
    setSub(authUser.attributes.sub);
    setUser(dbUser);
  };
  console.log(user?.id);
  console.log(sub);


  useEffect(() => {
    fetchUser();
  }, []);

  return (

    <NavigationContainer>
      <Stack.Navigator>
        {user?.id !== sub ? (
          <Stack.Screen name='FirstEditProfile' component={FirstEditProfile} options={{ title: 'Create your account' }} />
        ) : null}
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
