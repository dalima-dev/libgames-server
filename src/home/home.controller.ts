import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { HomeService } from './home.service';

@ApiTags('home')
@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @ApiOperation({
    summary: 'List all genders with all its related games.',
  })
  @Get()
  findAllGamesByGender() {
    return this.homeService.findAllGamesByGender();
  }

  @ApiOperation({
    summary:
      'List each profile of logged user with its respective favourites games.',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('profiles')
  findAllProfilesByLoggedUser(@LoggedUser() user: User) {
    return this.homeService.findAllProfilesByLoggedUser(user.id);
  }
}
