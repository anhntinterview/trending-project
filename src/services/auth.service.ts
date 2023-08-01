// services/AuthService.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserService } from './UserService';
import { sessionMiddleware } from './sessionMiddleware';
import { SolidFacade } from './SolidFacade';

export class AuthService {
  private static privateKey = 'your-private-key'; // Replace with your private key
  private static expiresIn = '1h';

  private solidFacade: SolidFacade;

  constructor() {
    this.solidFacade = new SolidFacade();
  }

  async login(req: any, res: any): Promise<void> {
    const { username, password } = req.body;

    try {
      const user = await this.solidFacade.getUserService().findByUsername(username);
      if (!user) {
        throw new Error('User not found');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      const token = jwt.sign({ userId: user.id }, AuthService.privateKey, { expiresIn: AuthService.expiresIn });

      // Store token in session
      req.session.token = token;

      // Store token in blockchain
      await this.solidFacade.getBlockchainService().storeTokenOnBlockchain(token);

      res.json({ token });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  // Other methods: register, forgotPassword, twoFactorAuth, etc.
}