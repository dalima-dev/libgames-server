import { UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

export function adminError(user: User) {
  if (!user.isAdmin)
    throw new UnauthorizedException(`User ${user.nickname} isn't an admin.`);
}
