import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Dimensions,
  Pressable,
} from "react-native";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  Entypo,
} from "@expo/vector-icons";
import { Auth } from "aws-amplify";
import { User } from '../models';
// @ts-ignore
import { S3Image } from "aws-amplify-react-native";

const dummy_img =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/user.png";
const bg = "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/1.jpg";

const profilePictureWidth = Dimensions.get("window").width * 0.6;

interface ProfileScreenHeaderProps {
  user: User | undefined;
  isMe: boolean;
  navigation: any;
}

const ProfileScreenHeader: React.FC<ProfileScreenHeaderProps> = ({
  user,
  isMe = false,
  navigation,
}) => {
  const signOut = async () => {
    await Auth.signOut();
  };

  if (!user) {
    return <ActivityIndicator />;
  }

  const editProfile = () => {
    navigation.navigate("EditProfile");
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: bg }} style={styles.bg} />
      {user?.image ? (
        <S3Image imgKey={user.image} style={styles.image} />
      ) : (
        <Image source={{ uri: dummy_img }} style={styles.image} />
      )}
      <Text style={styles.name}>{user.name}</Text>

      {isMe && (
        <>
          <View style={styles.buttonsContainer}>
            <Pressable
              style={[styles.button, { backgroundColor: "royalblue" }]}
            >
              <AntDesign name="pluscircle" size={16} color="white" />
              <Text style={[styles.buttonText, { color: "white" }]}>
                Add to Story
              </Text>
            </Pressable>
            <Pressable style={styles.button} onPress={editProfile}>
              <MaterialCommunityIcons name="pencil" size={16} color="black" />
              <Text style={styles.buttonText}>Edit Profile</Text>
            </Pressable>
            <Pressable
              onPress={signOut}
              style={[styles.button, { flex: 0, width: 50 }]}
            >
              <MaterialIcons name="logout" size={16} color="black" />
            </Pressable>
          </View>
        </>
      )}

      {/* <View style={styles.textLine}>
        <Entypo
          name="graduation-cap"
          size={18}
          color="gray"
          style={{ width: 25 }}
        />
        <Text>Graduated university</Text>
      </View>

      <View style={styles.textLine}>
        <Ionicons name="time" size={18} color="gray" style={{ width: 25 }} />
        <Text>Joined on October 2013</Text>
      </View>

      <View style={styles.textLine}>
        <Entypo
          name="location-pin"
          size={18}
          color="gray"
          style={{ width: 25 }}
        />
        <Text>From Tenerife</Text>
      </View> */}
    </View>
  );
};

export default ProfileScreenHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  bg: {
    width: "100%",
    aspectRatio: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginBottom: -profilePictureWidth / 1.3,
  },
  image: {
    width: profilePictureWidth,
    aspectRatio: 1,
    borderRadius: 500,
    borderWidth: 5,
    borderColor: "white",
  },
  name: {
    fontWeight: "600",
    textAlign: 'center',
    letterSpacing: 1.6,
    fontSize: 20,
    marginVertical: 15,
  },
  buttonsContainer: {
    paddingVertical: 5,
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "lightgray",
  },
  button: {
    alignSelf: "stretch",
    flexDirection: "row",
    backgroundColor: "gainsboro",
    margin: 5,
    padding: 7,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonText: {
    marginHorizontal: 5,
    fontWeight: "500",
  },
  textLine: {
    alignSelf: "stretch",
    alignItems: "center",
    marginVertical: 5,
    flexDirection: "row",
  },
});
