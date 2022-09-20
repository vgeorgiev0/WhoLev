import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  Button,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { API, Auth, DataStore, graphqlOperation, Storage } from 'aws-amplify';
import { User } from '../models';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { v4 } from 'uuid';
// @ts-ignore
import { S3Image } from "aws-amplify-react-native";


const createUser = `
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      createdAt
      updatedAt
      name
      image
      _version
      _lastChangedAt
      _deleted
    }
  }
`;

const dummy_img =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/user.png";


type Props = NativeStackScreenProps<RootStackParamList, "FirstEditProfile">;

const UpdateProfileScreen = ({ navigation, route }: Props) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState<string>();
  const [user, setUser] = useState<User>()
  const insets = useSafeAreaInsets();



  useEffect(() => {
    const fetchUser = async () => {
      const authenticatedUser = await Auth.currentAuthenticatedUser()
      const dbUser = await DataStore.query(User, authenticatedUser.attributes.sub)
      setUser(dbUser)
      dbUser && setName(dbUser.name)
    }
    fetchUser()
  }, [])


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
  const updateUser = async () => {
    let imgKey: string | undefined
    if (image) {
      imgKey = await uploadFile(image);
    }
    user && await DataStore.save(User.copyOf(user, (updated) => {
      updated.name = name;
      if (imgKey) {
        updated.image = imgKey
      }
    }))
  }

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

  const createUserAsync = async () => {
    const authenticatedUser = await Auth.currentAuthenticatedUser()
    const newUser: any = {
      id: authenticatedUser.attributes.sub,
      name,
      _version: 1
    }
    if (image) {
      newUser.image = await uploadFile(image);
    }
    await API.graphql(graphqlOperation(createUser, { input: newUser }))
  }

  const onSave = async () => {
    if (user) {
      await updateUser()
    } else {
      await createUserAsync()
    }
    navigation.navigate('Feed')
  };


  let renderImage = <Image source={{ uri: dummy_img }} style={styles.image} />;
  if (image) {
    renderImage = <Image source={{ uri: image }} style={styles.image} />;
  } else if (user?.image) {
    renderImage = <S3Image imgKey={user.image} style={styles.image} />;
  }


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { marginBottom: insets.bottom }]}
      contentContainerStyle={{ flex: 1 }}
      keyboardVerticalOffset={150}
    >
      <Pressable onPress={pickImage} style={styles.imagePickerContainer}>
        {renderImage}
        <Text>Change photo</Text>
      </Pressable>

      <TextInput
        placeholder="Full name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <View style={styles.buttonContainer}>
        <Button onPress={onSave} title="Save" disabled={!name} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    padding: 10,
  },
  imagePickerContainer: {
    alignItems: "center",
  },
  image: {
    width: "30%",
    aspectRatio: 1,
    marginBottom: 10,
    borderRadius: 500,
  },
  input: {
    borderColor: "lightgrayVa",
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "100%",
    marginVertical: 10,
    padding: 10,
  },
  buttonContainer: {
    marginTop: "auto",
    marginBottom: 10,
    alignSelf: "stretch",
  },
});

export default UpdateProfileScreen;
