import { useEffect, useState } from "react";
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
import { User } from '../models';
// @ts-ignore
import { S3Image } from "aws-amplify-react-native";
import { useRecoilValue } from 'recoil';
import { dbUserAtom, subAtom } from '../state/user';


const dummy_img =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/user.png";

type Props = NativeStackScreenProps<RootStackParamList, "CreatePost">;

const CreatePostScreen = ({ navigation, route }: Props) => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const user = useRecoilValue(dbUserAtom)
  const sub = useRecoilValue(subAtom)



  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
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
    const newPost: any = {
      description: description,
      numberOfLikes: 0,
      numberOfShares: 0,
      postUserId: sub,
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
        {user ? <S3Image imgKey={user.image} style={styles.profileImage} /> : <Image source={{ uri: dummy_img }} style={styles.profileImage} />}
        {user ? <Text style={styles.name}>{user.name}</Text> : <Text>No user Found</Text>}
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
    marginTop: 30,
    alignItems: "center",
    borderRadius: 30,
    width: 300,
    alignSelf: "center",
    height: 45,
    justifyContent: "center",
    marginBottom: 15,
    flexDirection: "row",
    backgroundColor: "#fbeee0",
    borderWidth: 2,
    borderColor: '#422800',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
    paddingHorizontal: 18,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "black",
  },
  icon: {
    marginLeft: "auto",
  },
  postImage: { width: "50%", aspectRatio: 1, alignSelf: "center" },
});


// < !--HTML!-->
//   <button class="button-74" role="button">Button 74</button>

// /* CSS */
// .button - 74 {
//   box - shadow: #422800 4px 4px 0 0;
//   color: #422800;
//   cursor: pointer;
//   display: inline - block;
//   font - weight: 600;
//   font - size: 18px;
//   padding: 0 18px;
//   line - height: 50px;
//   text - align: center;
//   text - decoration: none;
//   user - select: none;
//   -webkit - user - select: none;
//   touch - action: manipulation;
// }

// .button - 74:hover {
//   background - color: #fff;
// }

// .button - 74:active {
//   box - shadow: #422800 2px 2px 0 0;
//   transform: translate(2px, 2px);
// }

// @media(min - width: 768px) {
//   .button - 74 {
//     min - width: 120px;
//     padding: 0 25px;
//   }
// }