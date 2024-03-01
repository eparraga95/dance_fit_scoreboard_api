import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryParams } from './dto/create-category.dto';
import { UpdateCategoryParams } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { Event } from 'src/events/entities/event.entity';
import { Music } from 'src/musics/entities/music.entity';
import { Player } from 'src/players/entities/player.entity';
import { adminAddPlayerParams } from './dto/adm-add-player.dto';
import { adminRemovePlayerParams } from './dto/adm-remove-player.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    @InjectRepository(Music) private musicRepository: Repository<Music>,
    @InjectRepository(Player) private playerRepository: Repository<Player>,
  ) {}

  async create(createCategoryDetails: CreateCategoryParams) {
    try {
      const { event_id, name, level_max, level_min, number_of_phases } =
        createCategoryDetails;

      if (!event_id || !name || !level_min || !level_max || !number_of_phases) {
        throw new BadRequestException('Invalid category details');
      }

      const event = await this.eventRepository.findOne({
        where: { event_id: event_id },
      });

      if (!event) {
        throw new NotFoundException('Event not found');
      }

      const newCategory = this.categoryRepository.create({
        name: name,
        level_min: level_min,
        level_max: level_max,
        event: event,
        number_of_phases: number_of_phases,
      });

      const savedCategory = await this.categoryRepository.save(newCategory);
      return savedCategory;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }

  async findAll() {
    return await this.categoryRepository.find({
      relations: {
        players: true,
        phases: true,
      },
    });
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { category_id: id },
      relations: {
        players: true,
        phases: { musics: true, scores: { player: true, music: true } },
        event: true,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(id: number, updateCategoryDetails: UpdateCategoryParams) {
    try {
      const category = await this.categoryRepository.findOne({
        where: { category_id: id },
      });

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      const updateResult = await this.categoryRepository.update(
        { category_id: id },
        {
          ...updateCategoryDetails,
        },
      );

      if (updateResult.affected === 0) {
        throw new InternalServerErrorException('Failed to update category');
      }

      return { message: 'Category updated successfully' };
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const category = await this.categoryRepository.findOne({
        where: { category_id: id },
      });

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      const deletionResult = await this.categoryRepository.delete({
        category_id: id,
      });

      if (deletionResult.affected === 0) {
        throw new InternalServerErrorException('Failed to delete Category');
      }

      return { message: 'Category deleted successfully' };
    } catch (error) {
      console.error('Error deleting category');
      throw error;
    }
  }

  async addPlayer(player_id: number, category_id: number) {
    try {
      const category = await this.categoryRepository.findOne({
        where: {
          category_id: category_id,
        },
        relations: ['players'],
      });

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      const playerExists = category.players.some(
        (player) => player.player_id === player_id,
      );
      if (playerExists) {
        throw new BadRequestException(
          'Player already assigned to this Category',
        );
      }

      const player = await this.playerRepository.findOne({
        where: {
          player_id: player_id,
        },
      });

      if (!player) {
        throw new NotFoundException('Player not found');
      }

      category.players.push(player);

      await this.categoryRepository.save(category);
      return {
        message: 'Player added to category successfully',
      };
    } catch (error) {
      console.error('Error adding player to category:', error);
      throw error;
    }
  }

  async adminAddPlayer(
    adminAddPlayerDetails: adminAddPlayerParams,
    category_id: number,
  ) {
    try {
      const { player_id } = adminAddPlayerDetails;

      const player = await this.playerRepository.findOne({
        where: { player_id: player_id },
      });

      if (!player) {
        throw new NotFoundException('Player not found');
      }

      const category = await this.categoryRepository.findOne({
        where: {
          category_id: category_id,
        },
        relations: {
          players: true,
        },
      });

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      const playerExists = category.players.some(
        (p) => p.player_id == player_id,
      );
      if (playerExists) {
        throw new BadRequestException(
          'Player already assigned to this category',
        );
      }

      category.players.push(player);

      return await this.categoryRepository.save(category);
    } catch (error: any) {
      console.error('Error adding player to the category:', error);
      throw error;
    }
  }

  async removePlayer(player_id: number, category_id: number) {
    try {
      const category = await this.categoryRepository.findOne({
        where: {
          category_id: category_id,
        },
        relations: ['players'],
      });

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      const playerIndex = category.players.findIndex(
        (player) => player.player_id == player_id,
      );
      if (playerIndex === -1) {
        throw new BadRequestException(
          'Player is not assigned to this Category',
        );
      }

      category.players.splice(playerIndex, 1);

      await this.categoryRepository.save(category);
      return {
        message: 'Player removed from category successfully',
      };
    } catch (error) {
      console.error('Error removing player from category:', error);
      throw error;
    }
  }

  async adminRemovePlayer(
    adminRemovePlayerDetails: adminRemovePlayerParams,
    category_id: number,
  ) {
    try {
      const { player_id } = adminRemovePlayerDetails;

      const player = await this.playerRepository.findOne({
        where: { player_id: player_id },
      });
      if (!player) {
        throw new NotFoundException('Player not found');
      }

      const category = await this.categoryRepository.findOne({
        where: {
          category_id: category_id,
        },
        relations: {
          players: true,
        },
      });

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      const playerIndex = category.players.findIndex(
        (p) => p.player_id == player_id,
      );
      if (playerIndex === -1) {
        throw new BadRequestException('Player not assigned to this category');
      }

      category.players.splice(playerIndex, 1);

      return await this.categoryRepository.save(category);
    } catch (error: any) {
      console.error('Error removing player from category:', error);
      throw error;
    }
  }
}
