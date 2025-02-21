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
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { ScoresService } from './scores.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';
import { AdminCreateScoreDto } from './dto/adm-create-score.dto';
import { CustomUploadFileTypeValidator } from 'src/app.validators';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

const MAX_SCORE_PICTURE_SIZE_IN_BYTES = 8 * 1024 * 1024;
const VALID_UPLOADS_MIME_TYPES = [
  'image/jpeg', 
  'image/png', 
  'image/heic', 
  'image/gif', 
  'image/bmp', 
  'image/tiff', 
  'image/webp', 
  'image/svg+xml'
];

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addValidator(
          new CustomUploadFileTypeValidator({
            fileType: VALID_UPLOADS_MIME_TYPES,
          }),
        )
        .addMaxSizeValidator({
          maxSize: MAX_SCORE_PICTURE_SIZE_IN_BYTES,
        })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
    @Req() req: Request,
  ) {
    
    console.log(req.body)
    const { player } = req
    const { player_id } = player
    
    const createScoreDto: CreateScoreDto = {
      event_id: Number(req.body.event_id),
      music_id: Number(req.body.music_id),
      plate: req.body.plate ? req.body.plate : null,
      grade: req.body.grade,
      stage_pass: req.body.stage_pass === 'true' ? true : false,
      max_combo: Number(req.body.max_combo),
      miss: Number(req.body.miss),
      bad: Number(req.body.bad),
      good: Number(req.body.good),
      great: Number(req.body.great),
      perfect: Number(req.body.perfect),
      value: Number(req.body.value),
    }

    console.log(createScoreDto)

    console.log(file)

    const buffer = Buffer.from(file.buffer);
    const mimeType = file.mimetype;

    return this.scoresService.create(
      Number(player_id),
      createScoreDto,
      buffer,
      mimeType,
    );
  }

  @UseGuards(AdminGuard, AuthGuard)
  @Post('/admin/validate/:score_id')
  adminValidateScore(@Param('score_id') score_id: string) {
    return this.scoresService.adminValidateScore(+score_id)
  }

  @UseGuards(AdminGuard, AuthGuard)
  @Delete('/admin/invalidate/:score_id')
  adminInvalidateScore(@Param('score_id') score_id: string) {
    return this.scoresService.adminInvalidateScore(+score_id)
  }

  @UseGuards(AdminGuard, AuthGuard)
  @Post('/admin')
  adminCreate(@Body() admCreateScoreDto: AdminCreateScoreDto) {
    return this.scoresService.adminCreate(admCreateScoreDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('order') order: 'ASC' | 'DESC' = 'DESC'
  ) {
    return this.scoresService.findAll(page, limit, order);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scoresService.findOne(+id);
  }

  @Get('events/:event_id')
  findByEvent(@Param('event_id') event_id: string) {
    return this.scoresService.findByEvent(+event_id);
  }

  @Get('events/:event_id/pending')
  findPendingByEvent(@Param('event_id') event_id: string) {
    return this.scoresService.findPendingByEvent(+event_id)
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScoreDto: UpdateScoreDto) {
    return this.scoresService.update(+id, updateScoreDto);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scoresService.remove(+id);
  }
}
