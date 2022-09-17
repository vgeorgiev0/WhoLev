import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import {
  Entypo,
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
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

const IconButton = (text: string) => {
  return (
    <View style={styles.iconButton}>
      <AntDesign style={styles.likeIcon} name="like2" size={18} color="grey" />
      <Text style={styles.iconBUttonText}>{text}</Text>
    </View>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.post}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{ uri: post.User.image }}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.name}>{post.User.name}</Text>
            <Text style={styles.subtitle}>{post.createdAt}</Text>
          </View>
          <Entypo
            name="dots-three-horizontal"
            size={18}
            color="gray"
            style={styles.icon}
          />
        </View>
        {/* Body */}
        {post.description && (
          <Text style={styles.description}>{post.description}</Text>
        )}
        {post.image && (
          <Image source={{ uri: post.image }} style={styles.image} />
        )}
        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.statsRow}>
            <AntDesign
              style={styles.likeIcon}
              name="like2"
              size={24}
              color="blue"
            />
            <Text style={styles.likedBy}>
              Pesho and {post.numberOfLikes} others
            </Text>
            <Text style={styles.numberOfShares}>
              {post.numberOfShares} shares
            </Text>
          </View>
          <View style={styles.buttonsRow}>
            <View style={styles.iconButton}>
              <AntDesign
                style={styles.likeIcon}
                name="like2"
                size={18}
                color="grey"
              />
              <Text style={styles.iconBUttonText}>Like</Text>
            </View>
            <View style={styles.iconButton}>
              <FontAwesome5
                style={styles.likeIcon}
                name="comment-alt"
                size={18}
                color="grey"
              />
              <Text style={styles.iconBUttonText}>Comment</Text>
            </View>
            <View style={styles.iconButton}>
              <MaterialCommunityIcons
                style={styles.likeIcon}
                name="share-outline"
                size={18}
                color="grey"
              />
              <Text style={styles.iconBUttonText}>Share</Text>
            </View>
          </View>
        </View>
      </View>
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
    marginRight: 10,
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
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBUttonText: {
    color: "grey",
    marginLeft: 5,
  },
});
