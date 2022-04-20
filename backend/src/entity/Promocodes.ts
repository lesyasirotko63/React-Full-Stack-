import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
    CreateDateColumn,
    UpdateDateColumn,

    JoinTable,
    ManyToMany,

} from 'typeorm';
import * as TypeBox from '@sinclair/typebox';

import { Products, productsSchema } from './Products';

/**
 * Schema for promocodes entity
 */
export const promocodesSchema = TypeBox.Type.Object({
    id: TypeBox.Type.String({ format: 'uuid' }),

        code: TypeBox.Type.String({ default: '' }),

        discount: TypeBox.Type.Number({ default: 0 }),

        products: TypeBox.Type.Array(productsSchema, { default: [] }),

}, { additionalProperties: false });

/**
 * Schema for creating a new promocodes
 */
export const newPromocodesSchema = TypeBox.Type.Omit(
    promocodesSchema,
    // remove metadata fields
    ['id'],
    { additionalProperties: false },
);

@Entity()
export class Promocodes implements TypeBox.Static<typeof promocodesSchema> {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

        @Column({ default: '' })
        code!: string;

        @Column({ type: 'decimal', default: 0 })
        discount!: number;

        @ManyToMany(() => Products, { eager: true, cascade: true })
    @JoinTable({ name: 'promocodes_products_join' })
        products!: Products[];

}
