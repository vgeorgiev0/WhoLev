import { FlatList, StyleSheet, Text, View } from "react-native";
import postsData from "../../assets/data/posts.json";
import FeedPost from "../components/FeedPost";

type Props = {};

const FeedScreen = (props: Props) => {
  return (
    <View>
      <FlatList
        data={postsData}
        renderItem={({ item }) => <FeedPost post={item} />}
      />
    </View>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({});
