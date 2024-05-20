import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePhaseParams } from './dto/create-phase.dto';
import { UpdatePhaseParams } from './dto/update-phase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Phase } from './entities/phase.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { AddMusicParams } from './dto/add-music.dto';
import { Music } from 'src/musics/entities/music.entity';
import { RemoveMusicParams } from './dto/remove-music.dto';
import { Score } from 'src/scores/entities/score.entity';

@Injectable()
export class PhasesService {
  constructor(
    @InjectRepository(Phase) private phaseRepository: Repository<Phase>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Music) private musicRepository: Repository<Music>,
    @InjectRepository(Score) private scoreRepository: Repository<Score>,
  ) {}

  async create(createPhaseDetails: CreatePhaseParams) {
    try {
      const { category_id, phase_number } = createPhaseDetails;

      const category = await this.categoryRepository.findOne({
        where: {
          category_id: category_id,
        },
        relations: {
          phases: true,
        },
      });

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      if (category.phases.length >= category.number_of_phases) {
        throw new BadRequestException(
          'This Category cannot have any more Phases',
        );
      }

      const existingPhase = category.phases.find(
        (phase) => phase.phase_number === phase_number,
      );
      if (existingPhase) {
        throw new BadRequestException(
          'A Phase with this Phase number already exists',
        );
      }

      const newPhase = this.phaseRepository.create(createPhaseDetails);

      await this.phaseRepository.save(newPhase);

      category.phases.push(newPhase);

      await this.categoryRepository.save(category);

      return newPhase;
    } catch (error) {
      console.error('Error creating phase:', error);
      throw error;
    }
  }

  async findAll() {
    return await this.phaseRepository.find({
      relations: {
        musics: true,
        category: { event: true },
      },
    });
  }

  async findOne(id: number) {
    const phase = await this.phaseRepository.findOne({
      where: {
        phase_id: id,
      },
      relations: {
        musics: true,
        category: { event: true },
      },
    });

    if (!phase) {
      throw new NotFoundException('Phase not found');
    }

    return phase;
  }

  async update(phase_id: number, updatePhaseDetails: UpdatePhaseParams) {
    try {
      const { music_number, modes_available } = updatePhaseDetails;

      const phase = await this.phaseRepository.findOne({
        where: {
          phase_id: phase_id,
        },
        relations: {
          musics: true,
        },
      });

      if (!phase) {
        throw new NotFoundException('Phase not found');
      }

      // check if new music number is lower than the actual number of musis already assigned to this phase
      if (music_number < phase.musics.length) {
        throw new BadRequestException(
          'Cannot set music number lower than the actual number of musics already assigned to this phase',
        );
      }

      // check if the new modes_available will include all the already assigned musics mode
      if (
        modes_available &&
        phase.musics.some((m) => !modes_available.includes(m.mode))
      ) {
        throw new BadRequestException(
          'Music modes cannot be updated since there are musics in this phase that will not respect the new modes available',
        );
      }

      const updateResult = await this.phaseRepository.update(
        phase_id,
        updatePhaseDetails,
      );

      if (updateResult.affected === 0) {
        throw new InternalServerErrorException('Failed to update category');
      }

      return await this.phaseRepository.findOne({
        where: {
          phase_id: phase_id,
        },
      });
    } catch (error) {
      console.error('Error updating phase:', error);
      throw error;
    }
  }

  async remove(phase_id: number) {
    try {
      const phase = await this.phaseRepository.findOne({
        where: {
          phase_id: phase_id,
        },
      });

      if (!phase) {
        throw new NotFoundException('Phase not found');
      }

      const deletionResult = await this.phaseRepository.delete({
        phase_id: phase.phase_id,
      });

      if (deletionResult.affected === 0) {
        throw new InternalServerErrorException('Failed to delete phase');
      }

      return { message: 'Phase deleted successfully' };
    } catch (error) {
      console.error('Error deleting phase:', error);
      throw error;
    }
  }

  async addMusic(phase_id: number, addMusicDetails: AddMusicParams) {
    try {
      const phase = await this.phaseRepository.findOne({
        where: {
          phase_id: phase_id,
        },
        relations: {
          musics: true,
          category: true,
        },
      });

      if (!phase) {
        throw new NotFoundException('Phase not found');
      }

      const { music_id } = addMusicDetails;

      const music = await this.musicRepository.findOne({
        where: {
          music_id: music_id,
        },
      });

      if (!music) {
        throw new NotFoundException('Music not found');
      }

      if (
        music.level > phase.category.level_max ||
        music.level < phase.category.level_min
      ) {
        throw new BadRequestException(
          'Music level is not in range with this Category',
        );
      }

      if (phase.musics.some((m) => m.music_id == music.music_id)) {
        throw new BadRequestException(
          'Music is already assigned to this phase',
        );
      }

      if (phase.musics.length >= phase.music_number) {
        throw new BadRequestException(
          'This Phase has already reached the maximum number of Musics',
        );
      }

      if (!phase.modes_available.includes(music.mode)) {
        throw new BadRequestException(
          'This music mode is not available in this Event Category Phase',
        );
      }

      phase.musics.push(music);

      await this.phaseRepository.save(phase);

      return phase;
    } catch (error) {
      console.error('Error adding music to phase:', error);
      throw error;
    }
  }

  async removeMusic(phase_id: number, removeMusicDetails: RemoveMusicParams) {
    try {
      const phase = await this.phaseRepository.findOne({
        where: {
          phase_id: phase_id,
        },
        relations: {
          musics: true,
          scores: { music: true },
        },
      });

      if (!phase) {
        throw new NotFoundException('Phase not found');
      }

      const { music_id } = removeMusicDetails;

      const music = await this.musicRepository.findOne({
        where: {
          music_id: music_id,
        },
      });

      if (!music) {
        throw new NotFoundException('Music not found');
      }

      const musicIndex = phase.musics.findIndex((m) => m.music_id == music_id);
      if (musicIndex === -1) {
        throw new BadRequestException('Music is not assigned to this Phase');
      }

      phase.scores = phase.scores.filter(
        (score) => score.music.music_id !== music_id,
      );
      
      phase.musics.splice(musicIndex, 1);

      await this.phaseRepository.save(phase);
      // delete all scores related to the music that was registered to this fase

      const scoresToDelete = await this.scoreRepository.find({
        where: {
          phase: phase,
          music: music,
        },
      });

      await this.scoreRepository.remove(scoresToDelete);

      return phase;
    } catch (error) {
      console.error('Error removing music from phase:', error);
      throw error;
    }
  }
}
