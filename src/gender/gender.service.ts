import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';

@Injectable()
export class GenderService {
  constructor(private readonly prisma: PrismaService){}

  create(dto: CreateGenderDto) {


    return 'This action adds a new gender';
  }

  async findAll() {
    return await this.prisma.;
  }

  findOne(id: string) {
    return `This action returns a #${id} gender`;
  }

  update(id: string, dto: UpdateGenderDto) {
    return `This action updates a #${id} gender`;
  }

  remove(id: string) {
    return `This action removes a #${id} gender`;
  }
}
