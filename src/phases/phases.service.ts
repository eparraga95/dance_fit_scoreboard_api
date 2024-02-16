import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePhaseParams } from './dto/create-phase.dto';
import { UpdatePhaseDto, UpdatePhaseParams } from './dto/update-phase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Phase } from './entities/phase.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { AddMusicParams } from './dto/add-music.dto';
import { Music } from 'src/musics/entities/music.entity';
import { RemoveMusicParams } from './dto/remove-music.dto';

@Injectable()
export class PhasesService {
  constructor(
    @InjectRepository(Phase) private phaseRepository: Repository<Phase>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Music) private musicRepository: Repository<Music>,
  ) {}

  async create(createPhaseDetails: CreatePhaseParams) {
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

    if (category.phases.length === category.number_of_phases) {
      throw new BadRequestException(
        'This Category cannot have any more Phases',
      );
    }

    // check if category: number_of_phases isn't exceeded
    if (category.number_of_phases === category.phases.length) {
      throw new BadRequestException('This Category already reached its maximum Phase number')
    }

    // check if same phase: phase_number already exists
    if (category.phases.map((ph) => ph.phase_number === phase_number)) {
      throw new BadRequestException('A Phase with this Phase number already exists')
    }

    const newPhase = this.phaseRepository.create(createPhaseDetails);

    await this.phaseRepository.save(newPhase);

    category.phases = [...category.phases, newPhase];

    await this.categoryRepository.save(category);

    return newPhase;
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

  async update(id: number, updatePhaseDetails: UpdatePhaseParams) {
    const phase = await this.phaseRepository.findOne({
      where: {
        phase_id: id,
      },
    });

    if (!phase) {
      throw new NotFoundException('Phase not found');
    }

    return await this.phaseRepository.update(
      { phase_id: id },
      { ...updatePhaseDetails },
    );
  }

  async remove(id: number) {
    const phase = await this.phaseRepository.findOne({
      where: {
        phase_id: id,
      },
    });

    if (!phase) {
      throw new NotFoundException('Phase not found');
    }

    return await this.phaseRepository.delete({ phase_id: id });
  }

  async addMusic(phase_id: number, addMusicDetails: AddMusicParams) {
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

    // check if music level is within category level range
    if (
      music.level > phase.category.level_max ||
      music.level < phase.category.level_min
    ) {
      throw new BadRequestException(
        'Music level is not in range with this Category',
      );
    }

    // check if phase: music_number isn`t exceeded
    if (phase.musics.length === phase.music_number) {
      throw new BadRequestException(
        'This Phase has already the maximum number of Musics',
      );
    }

    // check if music: mode is within phase: modes_available
    if (!phase.modes_available.includes(music.mode)) {
      throw new BadRequestException('This music mode is not available in this Event Category Phase')
    }

    phase.musics = [...phase.musics, music];

    return await this.phaseRepository.save(phase);
  }

  async removeMusic(phase_id: number, removeMusicDetails: RemoveMusicParams) {
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

    const { music_id } = removeMusicDetails;

    const music = await this.musicRepository.findOne({
      where: {
        music_id: music_id,
      },
    });

    if (!music) {
      throw new NotFoundException('Music not found');
    }

    if (phase.musics.filter((m) => m.music_id == music_id).length === 0) {
      throw new BadRequestException('Music is not assigned to this Phase');
    }

    phase.musics = phase.musics.filter((m) => m.music_id != music_id);

    return await this.phaseRepository.save(phase);
  }
}
