type RootStackParamList = {
  Feed: undefined;
  EditProfile: undefined;
  CreatePost: undefined;
  Profile: { id: string };
  FirstEditProfile: undefined;
}
interface Post {
  id: string;
  createdAt: string;
  User: User,
  description: string;
  image?: string;
  numberOfLikes: number;
  numberOfShares: number;
}
interface User {
  id: string;
  image: string;
  name: string;
  posts?: (Posts)[] | null;
}
interface Posts {
  id: string;
  createdAt: string;
  User: User;
  description: string;
  image: string;
  numberOfLikes: number;
  numberOfShares: number;
}
interface User {
  id: string;
  image: string;
  name: string;
}