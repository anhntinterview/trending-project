import { Post } from "@db/entity/post.entity";
import { AppDataSource } from "@root/data-source";

const PostRepository =  AppDataSource.getRepository(Post)

export default PostRepository 