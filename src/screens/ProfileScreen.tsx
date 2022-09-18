import { Text, StyleSheet, FlatList } from "react-native";

import FeedPost from "../components/FeedPost";

import user from "../../assets/data/user.json";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import ProfileScreenHeader from "../components/ProfileScreenHeader";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

const ProfileScreen = ({ navigation, route }: Props) => {
  // console.warn("User: ", route?.params?.id);

  return (
    <FlatList
      data={user.posts}
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
