import { Text, StyleSheet, FlatList, Alert } from "react-native";

import FeedPost from "../components/FeedPost";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import ProfileScreenHeader from "../components/ProfileScreenHeader";
import { useEffect, useState } from 'react';
import { Auth, DataStore } from 'aws-amplify';
import { User } from '../models';
import { Post } from '../models';
import { subAtom } from '../state/user';
import { useRecoilValue } from 'recoil';

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

const ProfileScreen = ({ navigation, route }: Props) => {
  const [user, setUser] = useState<User>()
  const [posts, setPosts] = useState<Post[]>([])
  const sub = useRecoilValue(subAtom)


  const userId = route?.params?.id || sub
  const isMe = userId === sub

  useEffect(() => {

    const fetchUser = async () => {

      if (!userId) {
        return
      }

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
            isMe={isMe}
            navigation={navigation}
          />
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
});

export default ProfileScreen;
