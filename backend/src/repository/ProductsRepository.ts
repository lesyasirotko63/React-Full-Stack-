import { EntityRepository, Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import dayjs from 'dayjs';

import { Products } from '../entity/Products';
import { applyFilters, EntityQuery } from './utils';

@EntityRepository(Products)
export class ProductsRepository extends Repository<Products> {

    filter(query: EntityQuery<Products> | undefined, page: number, size: number): Promise<[Products[], number]> {
        const qb = this.createQueryBuilder('e');
        applyFilters(qb, query);
        return qb
            .skip(page * size)
            .take(size)
            .getManyAndCount();
    }
}
