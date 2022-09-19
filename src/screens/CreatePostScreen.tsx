import { useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Post } from "../models";
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
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Auth, Storage } from 'aws-amplify';
import 'react-native-get-random-values'
import { v4 } from 'uuid';

const user = {
  id: "u1",
  image:
    "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg",
  name: "Vadim Savin",
};

type Props = NativeStackScreenProps<RootStackParamList, "CreatePost">;

const CreatePostScreen = ({ navigation, route }: Props) => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);


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
  const uploadFile = async (fileUri: string) => {
    try {
      const response = await fetch(fileUri);
      const blob = await response.blob();
      const key = `${v4()}.png`;
      await Storage.put(key, blob, {
        contentType: "image/png", // contentType is optional
      });
      return key;
    } catch (err) {
      console.log("Error uploading file:", err);
    }
  }

  const handlePost = async () => {
    const authenticatedUser = await Auth.currentAuthenticatedUser()
    const newPost: any = {
      description: description,
      numberOfLikes: 102,
      numberOfShares: 10,
      postUserId: authenticatedUser.attributes.sub,
    }
    if (image) {
      newPost.image = await uploadFile(image)
    }

    await DataStore.save(new Post(newPost))

    Keyboard.dismiss();
    setDescription("");
    setImage(null);
    navigation.goBack();
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
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        placeholder="What is on your mind"
        multiline
      />

      {image && <Image source={{ uri: image }} style={styles.postImage} />
      }
      <TouchableOpacity style={styles.buttonContainer} onPress={handlePost}>
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
