export interface ResultsRecordUSPA {
    id: number;
    zone: string;
    state: string;
    subclass?: string;
    category?: string;
    record?: string;
    performance?: string;
    recordno?: string;
    uspaclass?: string;
    uspadate?: string;
    location?: string;
    holders?: string;
    judges?: string;
    notes?: string;
    status?: string;
}



// Record Params
export interface RecordParams {

}
// Record Query
export interface RecordQuery {
    id: string;
}



// Records By State, Results
export interface ResultsRecordsByState {
    abbr: string;
    state: string;
    records: Array[ResultsRecordUSPA]
}
// Records By State Params
export interface RecordsByStateParams {
    abbr: string;
}
// Records By State Query
export interface RecordsByStateQuery {

}
// Records By State Error Codes
export type RecordsByStateErrorCodes = 'RECORDS_NOT_FOUND' | 'ERROR_FINDING_RECORDS';
