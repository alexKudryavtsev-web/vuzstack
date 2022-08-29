import { ExpressRequest } from '@app/api/types/expressRequest.interface';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UserService } from '../user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: ExpressRequest, _: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
      const decode: any = verify(token, process.env.ACCESS_SECRET);
      const user = await this.userService.readById(decode.id);
      req.user = user;
      next();
    } catch (err) {
      req.user = null;
      next();
    }
  }
}
