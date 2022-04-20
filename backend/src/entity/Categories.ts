import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    DeleteDateColumn,
    CreateDateColumn,
    UpdateDateColumn,

} from 'typeorm';
import * as TypeBox from '@sinclair/typebox';

/**
 * Schema for categories entity
 */
export const categoriesSchema = TypeBox.Type.Object({
    id: TypeBox.Type.String({ format: 'uuid' }),

        title: TypeBox.Type.String({ default: '' }),

}, { additionalProperties: false });

/**
 * Schema for creating a new categories
 */
export const newCategoriesSchema = TypeBox.Type.Omit(
    categoriesSchema,
    // remove metadata fields
    ['id'],
    { additionalProperties: false },
);

@Entity()
export class Categories implements TypeBox.Static<typeof categoriesSchema> {
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

}
