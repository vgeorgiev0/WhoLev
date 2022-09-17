import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import postsData from "../../assets/data/posts.json";
import FeedPost from "../components/FeedPost";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface FeedScreenProps {}
const image =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/user.png";

const FeedScreen: React.FC<FeedScreenProps> = () => {
  const navigation = useNavigation();

  const createPost = () => {
    // @ts-ignore
    navigation.navigate("Create Post");
  };

  return (
    <View>
      <FlatList
        ListHeaderComponent={() => (
          <Pressable onPress={createPost} style={styles.header}>
            <Image source={{ uri: image }} style={styles.profileImage} />
            <Text style={styles.name}>What's on your mind?</Text>
            <Entypo
              name="images"
              size={24}
              color="limegreen"
              style={styles.icon}
            />
          </Pressable>
        )}
        data={postsData}
        renderItem={({ item }) => <FeedPost post={item} />}
      />
    </View>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  header: {
    padding: 10,
    marginTop: 30,
    paddingVertical: 15,
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
