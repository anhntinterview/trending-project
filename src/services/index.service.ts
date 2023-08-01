// services/IndexService.ts
import { AuthService } from './AuthService';
import { UserService } from './UserService';
import { BlockchainService } from './BlockchainService';

export class SolidFacade {
  private authService: AuthService;
  private userService: UserService;
  private blockchainService: BlockchainService;

  constructor() {
    this.authService = new AuthService();
    this.userService = new UserService();
    this.blockchainService = new BlockchainService();
  }

  getAuthService(): AuthService {
    return this.authService;
  }

  getUserService(): UserService {
    return this.userService;
  }

  getBlockchainService(): BlockchainService {
    return this.blockchainService;
  }
}