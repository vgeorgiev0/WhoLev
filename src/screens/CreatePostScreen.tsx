import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";

const user = {
  id: "u1",
  image:
    "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg",
  name: "Vadim Savin",
};

interface CreatePostScreenProps {}

const CreatePostScreen: React.FC<CreatePostScreenProps> = () => {
  const [status, setStatus] = useState("");
  const [image, setImage] = useState<string>();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleSubmit = () => {
    console.warn(status);
    setStatus("");
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: user.image }} style={styles.profileImage} />
        <Text style={styles.name}>{user.name}</Text>
        <Entypo
          onPress={pickImage}
          name="images"
          size={24}
          color="limegreen"
          style={styles.icon}
        />
      </View>
      <TextInput
        value={status}
        onChangeText={setStatus}
        style={styles.input}
        placeholder="What is on your mind"
        multiline
      />

      <Image source={{ uri: image }} style={styles.postImage} />

      <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Post</Text>
        <MaterialCommunityIcons
          style={styles.buttonIcon}
          name="music-note-whole"
          size={30}
          color="white"
        />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default CreatePostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingTop: 30,
    backgroundColor: "#fff",
    padding: 10,
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 10,
  },
  profileImage: {
    height: 40,
    width: 40,
    borderRadius: 30,
    marginRight: 10,
  },
  name: {
    fontWeight: "500",
  },
  input: { paddingBottom: 20 },
  buttonContainer: {
    marginTop: "auto",
    alignItems: "center",
    backgroundColor: "blue",
    borderRadius: 25,
    width: 300,
    alignSelf: "center",
    height: 45,
    justifyContent: "center",
    marginBottom: 15,
    flexDirection: "row",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    paddingBottom: 5,
  },
  icon: {
    marginLeft: "auto",
  },
  buttonIcon: { paddingBottom: 15 },
  postImage: { width: "50%", aspectRatio: 4 / 3, alignSelf: "center" },
});
