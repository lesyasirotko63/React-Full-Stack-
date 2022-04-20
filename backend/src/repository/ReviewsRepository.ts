import { EntityRepository, Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import dayjs from 'dayjs';

import { Reviews } from '../entity/Reviews';
import { applyFilters, EntityQuery } from './utils';

@EntityRepository(Reviews)
export class ReviewsRepository extends Repository<Reviews> {

    filter(query: EntityQuery<Reviews> | undefined, page: number, size: number): Promise<[Reviews[], number]> {
        const qb = this.createQueryBuilder('e');
        applyFilters(qb, query);
        return qb
            .skip(page * size)
            .take(size)
            .getManyAndCount();
    }
}
