import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { ErrorMap } from '../../shared/common/utils/response/error.map';

export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const duplicate = await this.findOneByEmail(createUserDto.email);
    if (duplicate) {
      throw new BadRequestException(ErrorMap.CANNOT_CREATE_MODEL);
    }
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOneById(id: string) {
    return await this.userRepository.findOne({
      where: { id: id },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email: email },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new BadRequestException(ErrorMap.CANNOT_FIND_MODEL);
    }
    await this.userRepository.update(id, updateUserDto);
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async remove(id: string) {
    const result = await this.userRepository.delete(id);
    if (result.affected) {
      return true;
    } else {
      return false;
    }
  }
}
