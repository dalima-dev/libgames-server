import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { GenderService } from './gender.service';

@ApiTags('gender')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('gender')
export class GenderController {
  constructor(private readonly genderService: GenderService) {}

  @Post()
  @ApiOperation({ summary: 'This adds a new gender.' })
  create(@Body() createGenderDto: CreateGenderDto) {
    return this.genderService.create(createGenderDto);
  }

  @Get()
  @ApiOperation({ summary: 'This returns all genders.' })
  findAll() {
    return this.genderService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'This returns a gender by id.' })
  findOne(@Param('id') id: string) {
    return this.genderService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'This updates a gender by id.' })
  update(@Param('id') id: string, @Body() updateGenderDto: UpdateGenderDto) {
    return this.genderService.update(+id, updateGenderDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'This remove a gender by id.' })
  delete(@Param('id') id: string) {
    return this.genderService.delete(+id);
  }
}
