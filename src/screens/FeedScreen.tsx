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
import { useRecoilValue } from 'recoil';
import { postsAtom } from '../state/posts';
import { dbUserAtom } from '../state/user';
// @ts-ignore
import { S3Image } from "aws-amplify-react-native";

type Props = NativeStackScreenProps<RootStackParamList, "Feed">;

const dummy_img =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/user.png";

const FeedScreen = ({ navigation, route }: Props) => {
  const posts = useRecoilValue(postsAtom)
  const user = useRecoilValue(dbUserAtom)

  const createPost = () => {
    navigation.navigate("CreatePost");
  };
  const navigateToProfile = () => {
    user && navigation.navigate("Profile", { id: user.id });
  };


  return (
    <View>
      <FlatList
        ListHeaderComponent={() => (
          <Pressable onPress={createPost} style={styles.header}>
            <Pressable onPress={navigateToProfile}>
              {user ? <S3Image imgKey={user.image} style={styles.profileImage} /> : <Image source={{ uri: dummy_img }} style={styles.profileImage} />}
            </Pressable>
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
