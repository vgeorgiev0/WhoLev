// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Like, User, Comment, Post } = initSchema(schema);

export {
  Like,
  User,
  Comment,
  Post
};