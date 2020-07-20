import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { ResultsProfile } from '../../../typings';

@Entity()
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    people_id!: number;

    @Index({ unique: true })
    @Column()
    slug!: string;

    @Column()
    name!: string;


    toResultsProfile(): ResultsProfile {
        return {
            id: this.id,
            slug: this.slug,
            name: this.name,
            people_id: this.people_id,
        };
    }
}
