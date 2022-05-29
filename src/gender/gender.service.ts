import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { Gender } from './entities/gender.entity';

@Injectable()
export class GenderService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateGenderDto): Promise<Gender | void> {
    const data: Gender = { ...dto };
    return this.prisma.gender.create({ data }).catch(this.handleError);
  }

  handleError(error: Error) {
    console.log(error);
  }

  findAll(): Promise<Gender[]> {
    return this.prisma.gender.findMany();
  }

  async findById(id: number): Promise<CreateGenderDto> {
    const data: CreateGenderDto = await this.prisma.gender.findUnique({
      where: { id },
    });
    if (!data) throw new NotFoundException(`Gender with id ${id} not found!`);
    return data;
  }

  findOne(id: number): Promise<CreateGenderDto> {
    return this.findById(id);
  }

  update(id: number, dto: UpdateGenderDto): Promise<Gender> {
    this.findById(id);
    const data: Partial<Gender> = { ...dto };
    return this.prisma.gender.update({ where: { id }, data });
  }

  remove(id: number) {
    this.findById(id);
    return this.prisma.gender.delete({ where: { id } });
  }
}
