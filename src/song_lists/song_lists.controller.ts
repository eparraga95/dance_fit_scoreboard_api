import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SongListsService } from './song_lists.service';
import { CreateSongListDto } from './dto/create-song_list.dto';
import { AddSongDto } from './dto/add-song.dto';
import { RemoveSongDto } from './dto/remove-song.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('song-lists')
export class SongListsController {
  constructor(private readonly songListsService: SongListsService) {}

  @Get()
  findAll() {
    return this.songListsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.songListsService.findOne(+id);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Patch(':id/add-song')
  addSong(@Param('id') id: string, @Body() addSongDto: AddSongDto) {
    return this.songListsService.addSong(+id, addSongDto)
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Patch(':id/remove-song')
  removeSong(@Param('id') id: string, @Body() removeSongDto: RemoveSongDto) {
    return this.songListsService.removeSong(+id, removeSongDto)
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.songListsService.remove(+id);
  }
}
