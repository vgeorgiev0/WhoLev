
import { User } from "../models";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import like from "../../assets/images/like.png";
import {
  Entypo,
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import IconButton from "./IconButton";
// @ts-ignore
import { S3Image } from "aws-amplify-react-native";
import { useEffect, useState } from 'react';
import { DataStore } from 'aws-amplify';

const dummy_img =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/user.png";

interface FeedPostProps {
  post: any;
  navigation: any;
}

const FeedPost: React.FC<FeedPostProps> = ({ post, navigation }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [user, setUser] = useState<User>()

  useEffect(() => {
    DataStore.query(User, post.postUserId).then(setUser)
  }, [])


  const navigateToProfile = () => {
    navigation.navigate("Profile", { id: post.postUserId });
  };

  return (
    <View style={styles.post}>
      {/* Header */}
      <TouchableOpacity onPress={navigateToProfile} style={styles.header}>
        {user?.image ? (
          <S3Image imgKey={user.image} style={styles.profileImage} />
        ) : (
          <Image source={{ uri: dummy_img }} style={styles.profileImage} />
        )}

        <View>
          {/* @ts-ignore */}
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.subtitle}>{post.createdAt}</Text>
        </View>
        <Entypo
          name="dots-three-horizontal"
          size={18}
          color="gray"
          style={styles.icon}
        />
      </TouchableOpacity>
      {/* Body */}
      {post.description && (
        <Text style={styles.description}>{post.description}</Text>
      )}
      {post.image && (
        <S3Image imgKey={post.image} style={styles.image} resizeMode="cover" />
      )}
      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.statsRow}>
          <Image source={like} style={styles.likeIcon} />
          <Text style={styles.likedBy}>
            Pesho and {post.numberOfLikes} others
          </Text>
          <Text style={styles.numberOfShares}>
            {post.numberOfShares} shares
          </Text>
        </View>
        <View style={styles.buttonsRow}>
          <IconButton Icon={AntDesign} text={"Like"} name={"like2"} />
          <IconButton
            Icon={FontAwesome5}
            text={"Comment"}
            name={"comment-alt"}
          />
          <IconButton
            Icon={MaterialCommunityIcons}
            text={"Share"}
            name={"share-outline"}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    width: "100%",
    marginVertical: 10,
    backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  profileImage: {
    height: 40,
    width: 40,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontWeight: "500",
  },
  subtitle: { color: "gray" },
  icon: {
    marginLeft: "auto",
  },
  description: {
    paddingHorizontal: 10,
    lineHeight: 20,
    letterSpacing: 0.5,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    marginTop: 10,
  },
  footer: {
    paddingHorizontal: 10,
  },
  statsRow: {
    paddingVertical: 10,
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "lightgray",
  },
  likeIcon: {
    marginRight: 5,
    width: 20,
    height: 20,
  },
  likedBy: {
    color: "grey",
  },
  numberOfShares: {
    marginLeft: "auto",
    color: "grey",
  },
  buttonsRow: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default FeedPost;
