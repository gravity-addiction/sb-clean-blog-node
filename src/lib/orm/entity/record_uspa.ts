import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { ResultsRecordUSPA } from '../../../typings';

@Entity()
export class RecordUSPA {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    zone!: string;

    @Column()
    state!: string;

    @Column()
    subclass!: string;

    @Column()
    category!: string;

    @Column()
    record!: string;

    @Column()
    performance!: string;

    @Column()
    recordno!: string;

    @Column()
    uspaclass!: string;

    @Column()
    uspadate!: string;

    @Column()
    location!: string;

    @Column()
    holders!: string;

    @Column()
    judges!: string;

    @Column()
    notes!: string;

    @Column()
    status!: string;

    toResultsRecordUSPA(): ResultsRecordUSPA {
        return {
            id: this.id,
            zone: this.zone,
            state: this.state,
            subclass: this.subclass,
            category: this.category,
            record: this.record,
            performance: this.performance,
            recordno: this.recordno,
            uspaclass: this.uspaclass,
            uspadate: this.uspadate,
            location: this.location,
            holders: this.holders,
            judges: this.judges,
            notes: this.notes,
            status: this.status
        };
    }
}
