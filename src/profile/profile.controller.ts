import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({
    summary: 'Create new profile.',
  })
  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @ApiOperation({
    summary: 'List all profiles.',
  })
  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @ApiOperation({
    summary: 'Get a profile by Id.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Update a profile by Id.',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(+id, updateProfileDto);
  }

  @ApiOperation({
    summary: 'Delete user by Id.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.profileService.delete(+id);
  }
}
