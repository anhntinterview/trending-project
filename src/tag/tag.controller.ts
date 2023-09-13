import { Container, Service } from 'typedi';
import TagService from '@/tag/tag.service';

@Service()
class TagController {
  private tagService = Container.get(TagService);
  constructor() {}
}

export default TagController;
