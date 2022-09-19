import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import FeedPost from "../components/FeedPost";
import { Entypo } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from 'react';
import { Auth, DataStore, Predicates, SortDirection } from 'aws-amplify';
import { Post } from '../models';
// @ts-ignore
import { S3Image } from "aws-amplify-react-native";
import { User } from '../models';

type Props = NativeStackScreenProps<RootStackParamList, "Feed">;

const dummy_img =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/user.png";

const FeedScreen = ({ navigation, route }: Props) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const fetchUser = async () => {
      const authenticatedUser = await Auth.currentAuthenticatedUser()
      const dbUser = await DataStore.query(User, authenticatedUser.attributes.sub)
      setUser(dbUser)
    }
    fetchUser()
  }, [])



  useEffect(() => {
    const subscription = DataStore.observeQuery(Post, Predicates.ALL, {
      sort: (s) => s.createdAt(SortDirection.DESCENDING),
    }).subscribe(({ items }) => setPosts(items));

    return () => subscription.unsubscribe();
  }, []);

  const createPost = () => {
    navigation.navigate("CreatePost");
  };


  return (
    <View>
      <FlatList
        ListHeaderComponent={() => (
          <Pressable onPress={createPost} style={styles.header}>
            {user ? <S3Image imgKey={user.image} style={styles.profileImage} /> : <Image source={{ uri: dummy_img }} style={styles.profileImage} />}
            <Text style={styles.name}>What's on your mind?</Text>
            <Entypo
              name="images"
              size={24}
              color="limegreen"
              style={styles.icon}
            />
          </Pressable>
        )}
        data={posts}
        renderItem={({ item }) => (
          <FeedPost post={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  header: {
    padding: 10,
    marginTop: 40,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    color: "gray",
  },
  icon: {
    marginLeft: "auto",
  },
});
