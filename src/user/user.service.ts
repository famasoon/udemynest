import { Injectable } from '@nestjs/common';
import { User } from './models/user.entitiy';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { PagenatedResult } from 'src/common/pagenated-result.interface';

@Injectable()
export class UserService extends AbstractService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async pagenate(page = 1, relations = []): Promise<PagenatedResult> {
    const { data, meta } = await super.pagenate(page, relations);

    return {
      data: data.map((user) => {
        const { password, ...data } = user;
        return data;
      }),
      meta: meta,
    };
  }
}
