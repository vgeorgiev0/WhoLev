import { FlatList, StyleSheet, View } from "react-native";
import postsData from "../../assets/data/posts.json";
import FeedPost from "../components/FeedPost";

interface FeedScreenProps {}

const FeedScreen: React.FC<FeedScreenProps> = () => {
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
