import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProfileDto: CreateProfileDto): Promise<Profile> {
    const data: Profile = { ...createProfileDto };
    return this.prisma.profile.create({ data }).catch(handleError);
  }

  findAll(): Promise<Profile[]> {
    return this.prisma.profile.findMany();
  }

  async findById(id: number): Promise<Profile> {
    const record: Profile = await this.prisma.profile.findUnique({
      where: { id },
    });
    if (!record) throw new NotFoundException('Profile not found!');
    return record;
  }

  findOne(id: number): Promise<Profile> {
    return this.findById(id);
  }

  update(id: number, updateProfileDto: UpdateProfileDto): Promise<Profile> {
    this.findById(id);
    const data: Partial<Profile> = { ...updateProfileDto };
    return this.prisma.profile
      .update({ data, where: { id } })
      .catch(handleError);
  }

  delete(id: number): Promise<Profile> {
    this.findById(id);
    return this.prisma.profile.delete({ where: { id } });
  }
}
