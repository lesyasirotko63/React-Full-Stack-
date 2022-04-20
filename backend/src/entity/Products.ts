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

import { File, fileSchema } from './File';

import { Categories, categoriesSchema } from './Categories';

export enum Status {

        Instock = 'in stock',

        Outofstock = 'out of stock',

}

/**
 * Schema for products entity
 */
export const productsSchema = TypeBox.Type.Object({
    id: TypeBox.Type.String({ format: 'uuid' }),

        title: TypeBox.Type.String({ default: '' }),

        image: TypeBox.Type.Array(fileSchema, { default: [] }),

        price: TypeBox.Type.Number({ default: 0 }),

        categories: TypeBox.Type.Array(categoriesSchema, { default: [] }),

        rating: TypeBox.Type.Number({ default: 0 }),

        status: TypeBox.Type.Enum(Status),

}, { additionalProperties: false });

/**
 * Schema for creating a new products
 */
export const newProductsSchema = TypeBox.Type.Omit(
    productsSchema,
    // remove metadata fields
    ['id'],
    { additionalProperties: false },
);

@Entity()
export class Products implements TypeBox.Static<typeof productsSchema> {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

        @Column({ default: '' })
        title!: string;

        @ManyToMany(() => File, { eager: true, cascade: true })
    @JoinTable({ name: 'products_image_join' })
        image!: File[];

        @Column({ type: 'decimal', default: 0 })
        price!: number;

        @Column({ type: 'decimal', default: 0 })
        discount!: number;

        @Column({ default: '' })
        description!: string;

        @ManyToMany(() => Categories, { eager: true, cascade: true })
    @JoinTable({ name: 'products_categories_join' })
        categories!: Categories[];

        @ManyToMany(() => Products, { eager: true, cascade: true })
    @JoinTable({ name: 'products_more_products_join' })
        more_products!: Products[];

        @Column({ type: 'integer', default: 0 })
        rating!: number;

        @Column({ type: 'enum', enum: Status })
        status!: Status;

}
