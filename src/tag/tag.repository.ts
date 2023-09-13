import { Tag } from "@db/entity/tag.entity";
import { AppDataSource } from "@root/data-source";

const TagRepository =  AppDataSource.getRepository(Tag)

export default TagRepository 