import { EntityRepository, Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import dayjs from 'dayjs';

import { Promocodes } from '../entity/Promocodes';
import { applyFilters, EntityQuery } from './utils';

@EntityRepository(Promocodes)
export class PromocodesRepository extends Repository<Promocodes> {

    filter(query: EntityQuery<Promocodes> | undefined, page: number, size: number): Promise<[Promocodes[], number]> {
        const qb = this.createQueryBuilder('e');
        applyFilters(qb, query);
        return qb
            .skip(page * size)
            .take(size)
            .getManyAndCount();
    }
}
