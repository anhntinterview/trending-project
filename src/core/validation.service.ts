import { ValidationError, validateSync, validate } from 'class-validator';
import { Service } from 'typedi';

@Service()
class TValidator<T extends object> {
  errors: ValidationError[];

  async validate(obj: T): Promise<void> {
    this.errors = await validate(obj);
  }
}

export default TValidator;
