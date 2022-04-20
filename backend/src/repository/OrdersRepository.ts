import { EntityRepository, Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import dayjs from 'dayjs';

import { Orders } from '../entity/Orders';
import { applyFilters, EntityQuery } from './utils';

@EntityRepository(Orders)
export class OrdersRepository extends Repository<Orders> {

    filter(query: EntityQuery<Orders> | undefined, page: number, size: number): Promise<[Orders[], number]> {
        const qb = this.createQueryBuilder('e');
        applyFilters(qb, query);
        return qb
            .skip(page * size)
            .take(size)
            .getManyAndCount();
    }
}
