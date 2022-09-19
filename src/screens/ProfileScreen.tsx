import { Text, StyleSheet, FlatList, Alert } from "react-native";

import FeedPost from "../components/FeedPost";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import ProfileScreenHeader from "../components/ProfileScreenHeader";
import { useEffect, useState } from 'react';
import { Auth, DataStore } from 'aws-amplify';
import { User } from '../models';
import { Post } from '../models';

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

const ProfileScreen = ({ navigation, route }: Props) => {
  const [user, setUser] = useState<User>()
  const [posts, setPosts] = useState<Post[]>([])


  useEffect(() => {

    const fetchUser = async () => {
      const authenticatedUser = await Auth.currentAuthenticatedUser()
      const userId = route?.params?.id || authenticatedUser.attributes.sub

      if (!userId) {
        return
      }
      const isMe = userId === authenticatedUser.attributes.sub


      const dbUser = await DataStore.query(User, userId)
      if (!dbUser) {
        if (isMe) {
          navigation.navigate('EditProfile')
        } else {
          Alert.alert('User not found')
        }
      } else { setUser(dbUser) }


      DataStore.query(Post, (p) => p.postUserId('eq', userId)).then(setPosts);
    }
    fetchUser()
  }, [])



  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <FeedPost post={item} navigation={navigation} />
      )}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => (
        <>
          <ProfileScreenHeader
            user={user}
            isMe={true}
            navigation={navigation}
          />
          <Text style={styles.sectionTitle}>Posts</Text>
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    marginLeft: 10,
    marginVertical: 5,
    fontWeight: "500",
    fontSize: 18,
  },
});

export default ProfileScreen;
