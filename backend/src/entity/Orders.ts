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

export enum Status {

        Incart = 'in cart',

        Bought = 'bought',

}

/**
 * Schema for orders entity
 */
export const ordersSchema = TypeBox.Type.Object({
    id: TypeBox.Type.String({ format: 'uuid' }),

        order_date: TypeBox.Type.String({ format: 'date-time' }),

        product: TypeBox.Type.Optional(productsSchema),

        user: TypeBox.Type.Optional(usersSchema),

        amount: TypeBox.Type.Number({ default: 0 }),

        status: TypeBox.Type.Enum(Status),

}, { additionalProperties: false });

/**
 * Schema for creating a new orders
 */
export const newOrdersSchema = TypeBox.Type.Omit(
    ordersSchema,
    // remove metadata fields
    ['id'],
    { additionalProperties: false },
);

@Entity()
export class Orders implements Omit<TypeBox.Static<typeof ordersSchema>, 'order_date' | 'product' | 'user'> {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

        @Column({ type: 'timestamptz', nullable: true })
        order_date?: Date;

        @OneToOne(() => Products, { eager: true, cascade: true })
    @JoinColumn()
        product?: Products;

        @OneToOne(() => Users, { eager: true, cascade: true })
    @JoinColumn()
        user?: Users;

        @Column({ type: 'integer', default: 0 })
        amount!: number;

        @Column({ type: 'enum', enum: Status })
        status!: Status;

}
