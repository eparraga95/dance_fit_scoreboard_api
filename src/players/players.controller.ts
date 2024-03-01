import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Req,
  ParseFilePipeBuilder,
  HttpStatus,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomUploadFileTypeValidator } from 'src/app.validators';

const MAX_PROFILE_PICTURE_SIZE_IN_BYTES = 8 * 1024 * 1024;
const VALID_UPLOADS_MIME_TYPES = ['image/jpeg', 'image/png'];

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  @UseGuards(AuthGuard)
  @Post('profile-picture')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfilePicture(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addValidator(
          new CustomUploadFileTypeValidator({
            fileType: VALID_UPLOADS_MIME_TYPES,
          }),
        )
        .addMaxSizeValidator({ maxSize: MAX_PROFILE_PICTURE_SIZE_IN_BYTES })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
    @Req() { user },
  ) {
    const { player_id } = user;

    const buffer = Buffer.from(file.buffer);

    const mimeType = file.mimetype

    return this.playersService.uploadProfilePicture(player_id, buffer, mimeType);
  }

  @UseGuards(AdminGuard, AuthGuard)
  @Get()
  findAll() {
    return this.playersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(+id);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ) {
    return this.playersService.update(id, updatePlayerDto);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.playersService.remove(id);
  }
}
