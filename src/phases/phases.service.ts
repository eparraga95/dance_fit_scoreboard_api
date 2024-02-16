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

@Injectable()
export class PhasesService {
  constructor(
    @InjectRepository(Phase) private phaseRepository: Repository<Phase>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createPhaseDetails: CreatePhaseParams) {
    const { category_id } = createPhaseDetails;

    const category = await this.categoryRepository.findOne({
      where: {
        category_id: category_id,
      },
      relations: {
        phases: true
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

    const newPhase = this.phaseRepository.create(createPhaseDetails);

    await this.phaseRepository.save(newPhase);

    category.phases = [...category.phases, newPhase];

    await this.categoryRepository.save(category);

    return newPhase;
  }

  async findAll() {
    return await this.phaseRepository.find();
  }

  async findOne(id: number) {
    const phase = await this.phaseRepository.findOne({
      where: {
        phase_id: id,
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
}
