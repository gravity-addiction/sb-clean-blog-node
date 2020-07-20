import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UspaPeople {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    slug!: string;
}
