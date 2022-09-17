import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, View } from "react-native";
import FeedPost from "./src/components/FeedPost";

const post = {
  id: "p1",
  createdAt: "19 m",
  User: {
    id: "u1",
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/zuck.jpeg",
    name: "Vadim Savin",
  },
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/1.jpg",
  numberOfLikes: 11,
  numberOfShares: 2,
};

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <FeedPost post={post} />
        <FeedPost post={post} />
        <FeedPost post={post} />
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
