import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { Gender } from './entities/gender.entity';

@Injectable()
export class GenderService {
  constructor(private readonly prisma: PrismaService) {}

  create(createGenderDto: CreateGenderDto): Promise<Gender> {
    const data: Gender = { ...createGenderDto };
    return this.prisma.gender.create({ data }).catch(handleError);
  }

  findAll(): Promise<Gender[]> {
    return this.prisma.gender.findMany();
  }

  async findById(id: number): Promise<Gender> {
    const data: CreateGenderDto = await this.prisma.gender.findUnique({
      where: { id },
    });
    if (!data) throw new NotFoundException(`Gender with id ${id} not found!`);
    return data;
  }

  findOne(id: number): Promise<Gender> {
    return this.findById(id);
  }

  update(id: number, updateGenderDto: UpdateGenderDto): Promise<Gender> {
    this.findById(id);
    const data: Partial<Gender> = { ...updateGenderDto };
    return this.prisma.gender.update({ where: { id }, data });
  }

  delete(id: number): Promise<Gender> {
    this.findById(id);
    return this.prisma.gender.delete({ where: { id } });
  }
}
