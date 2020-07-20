import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PeopleCrossed {
    @PrimaryGeneratedColumn('uuid')
    uuid!: string;

    @Column()
    master_id!: number;

    @Column()
    child_id!: number;
}
