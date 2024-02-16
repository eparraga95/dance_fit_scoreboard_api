import { AddMusicDto } from './dto/add-music.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';
import { RemoveMusicDto } from './dto/remove-music.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(AuthGuard, AdminGuard)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }

  // @UseGuards(AuthGuard, AdminGuard)
  // @Patch(':id/add')
  // addMusic(@Body() addMusicDto: AddMusicDto, @Param('id') category_id: number) {
  //   return this.categoriesService.addMusic(category_id, addMusicDto);
  // }

  // @UseGuards(AuthGuard, AdminGuard)
  // @Patch(':id/remove')
  // removeMusic(
  //   @Body() addMusicDto: RemoveMusicDto,
  //   @Param('id') category_id: number,
  // ) {
  //   return this.categoriesService.removeMusic(category_id, addMusicDto);
  // }

  @UseGuards(AuthGuard)
  @Patch(':id/join')
  addPlayer(@Req() { user }, @Param('id') category_id: number) {
    const { player_id } = user;

    return this.categoriesService.addPlayer(player_id, category_id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/leave')
  removePlayer(@Req() { user }, @Param('id') category_id: number) {
    const { player_id } = user;

    return this.categoriesService.removePlayer(player_id, category_id);
  }
}
