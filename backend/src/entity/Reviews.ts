import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
    CreateDateColumn,
    UpdateDateColumn,

    OneToOne,
    JoinColumn,

} from 'typeorm';
import * as TypeBox from '@sinclair/typebox';

import { Products, productsSchema } from './Products';

import { Users, usersSchema } from './Users';

/**
 * Schema for reviews entity
 */
export const reviewsSchema = TypeBox.Type.Object({
    id: TypeBox.Type.String({ format: 'uuid' }),

        body: TypeBox.Type.String({ default: '' }),

        rating: TypeBox.Type.Number({ default: 0 }),

        product: TypeBox.Type.Optional(productsSchema),

        user: TypeBox.Type.Optional(usersSchema),

}, { additionalProperties: false });

/**
 * Schema for creating a new reviews
 */
export const newReviewsSchema = TypeBox.Type.Omit(
    reviewsSchema,
    // remove metadata fields
    ['id'],
    { additionalProperties: false },
);

@Entity()
export class Reviews implements Omit<TypeBox.Static<typeof reviewsSchema>, 'product' | 'user'> {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

        @Column({ default: '' })
        body!: string;

        @Column({ type: 'integer', default: 0 })
        rating!: number;

        @OneToOne(() => Products, { eager: true, cascade: true })
    @JoinColumn()
        product?: Products;

        @OneToOne(() => Users, { eager: true, cascade: true })
    @JoinColumn()
        user?: Users;

}
