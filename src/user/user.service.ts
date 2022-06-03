import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private userSelect = {
    id: true,
    nickname: true,
    email: true,
    password: false,
    cpf: true,
    isAdmin: true,
    createdAt: true,
    updatedAt: true,
  };

  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.confirmPassword) {
      throw new BadRequestException(`Passwords don't match!`);
    }
    delete createUserDto.confirmPassword;
    const data: User = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };
    return this.prisma.user
      .create({ data, select: this.userSelect })
      .catch(handleError);
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      select: this.userSelect,
    });
  }

  async findById(id: string): Promise<User> {
    const record: User = await this.prisma.user.findUnique({
      where: { id },
      select: this.userSelect,
    });
    if (!record) throw new NotFoundException('User not found!');
    return record;
  }

  findOne(id: string): Promise<User> {
    return this.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    this.findById(id);

    if (updateUserDto.password)
      if (updateUserDto.password != updateUserDto.confirmPassword)
        throw new BadRequestException(`Passwords don't match!`);

    delete updateUserDto.confirmPassword;

    const data: Partial<User> = { ...updateUserDto };

    if (data.password) data.password = await bcrypt.hash(data.password, 10);

    return this.prisma.user
      .update({ data, where: { id }, select: this.userSelect })
      .catch(handleError);
  }

  delete(id: string): Promise<User> {
    this.findById(id);
    return this.prisma.user.delete({ where: { id }, select: this.userSelect });
  }
}
