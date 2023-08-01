// src/middleware/AuthMiddleware.ts
import { Request, Response, NextFunction } from 'express';

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const { token } = req.session;
  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
  } else {
    // Check token validity here if necessary
    next();
  }
}