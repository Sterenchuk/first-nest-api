import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CreateUserDto } from '../dto/crate-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { validate } from 'class-validator';
@Injectable()
export class ValidationMiddlewareService implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    // Check if the request is a PATCH or POST
    const isPatch = req.method === 'PATCH';
    const DtoClass = isPatch ? UpdateUserDto : CreateUserDto;

    const dtoInstance = new DtoClass();
    Object.assign(dtoInstance, req.body);

    const errors = await validate(dtoInstance);
    if (errors.length > 0) {
      const formattedErrors = errors.map((err) => ({
        field: err.property,
        message:
          Object.values(err.constraints ?? {}).join(', ') || 'Invalid value',
      }));

      throw new BadRequestException({ errors: formattedErrors });
    }

    next();
  }
}
