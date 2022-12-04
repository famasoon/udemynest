import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PagenatedResult } from './pagenated-result.interface';

@Injectable()
export abstract class AbstractService {
  protected constructor(protected readonly repository: Repository<any>) {}

  async all(relations = []): Promise<any[]> {
    return await this.repository.find({ relations });
  }

  async pagenate(page = 1, relations = []): Promise<PagenatedResult> {
    const take = 15;
    const [data, total] = await this.repository.findAndCount({
      take,
      skip: (page - 1) * take,
      relations: relations,
    });

    return {
      data: data,
      meta: {
        total,
        page,
        last_page: Math.ceil(total / take),
      },
    };
  }

  async create(data): Promise<any> {
    return this.repository.save(data);
  }

  async findOne(condition, relations = []): Promise<any> {
    return this.repository.findOne({
      where: { condition },
      relations: { relations },
    });
  }

  async update(id: number, data): Promise<any> {
    return this.repository.update(id, data);
  }

  async delete(id: number): Promise<any> {
    return this.repository.delete(id);
  }
}
