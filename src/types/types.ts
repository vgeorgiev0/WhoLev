type Post = {
  id: string;
  createdAt: string;
  User: {
    id: string;
    image: string;
    name: string;
  };
  description: string;
  image: string;
  numberOfLikes: number;
  numberOfShares: number;
}