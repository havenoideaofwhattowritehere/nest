import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';
import * as bcrypt from 'bcrypt';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { UserDto } from './types/userDto';
import { isEmpty } from 'class-validator';
import { ErrorMap } from '../../shared/common/utils/response/error.map';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user || isEmpty(password)) {
      throw new BadRequestException('Invalid credentials');
    }
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }
    return user;
  }

  async login(user: UserDto) {
    const payload: AuthJwtPayload = { email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateJwtPayload(payload: AuthJwtPayload) {
    const user = await this.userService.findByEmail(payload.email);
    if (!user) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }
    return user;
  }
}
