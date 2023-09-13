import { Tag } from '@db/entity/tag.entity';

export interface TagsDTO {
  list: Array<Tag>;
  count: number;
}

export interface TagRO {
  tag: Tag;
}
