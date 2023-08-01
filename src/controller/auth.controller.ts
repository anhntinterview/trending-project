// src/controllers/AuthController.ts
import { AuthService } from '../services/AuthService';

export class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    try {
      await AuthService.login(req, res);
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  // Other methods: register, logout, forgotPassword, twoFactorAuth, etc.
}