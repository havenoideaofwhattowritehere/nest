import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.create(createUserDto);
  }

  async findUsers() {
    return this.userRepository.findAll();
  }

  async findById(id: string) {
    return this.userRepository.findOneById(id);
  }

  async findByEmail(email: string) {
    return this.userRepository.findOneByEmail(email);
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    return this.userRepository.update(id, updateUserDto);
  }

  async removeUser(id: string) {
    return this.userRepository.remove(id);
  }
}
