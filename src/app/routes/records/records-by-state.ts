// import { findProfile, findProfileBySlug } from '@app/routes/_shared/profiles';
import { RecordUSPA } from '@lib/orm/entity';
import fastify from 'fastify';
import { getConnection } from 'typeorm';

import { ResultsRecordUSPA, RecordsByStateParams, RecordsByStateQuery, ResultsRecordsByState } from '../../../typings';

export const recordsByState: fastify.RoutePlugin = async function(instance, options): Promise<void> {
    instance.route({
        method: 'GET',
        url: '/state/:abbr',
        schema,
        handler,
    });
};

export const handler: fastify.RequestHandlerWithParams<RecordsByStateParams> = async function(
    request,
    reply
): Promise<ResultsRecordUSPA[]> {
    const recordsByStateQuery: RecordsByStateQuery = request.query as RecordsByStateQuery;
    const recordsByStateParams: RecordsByStateParams = request.params;
    
    const recordsRepository = getConnection().getRepository(RecordUSPA);
    const recordsQuery = recordsRepository
    .createQueryBuilder("recordsuspa") // first argument is an alias. Alias is what you are selecting - photos. You must specify it.
    .where("recordsuspa.status = :rStatus")
    .andWhere("recordsuspa.zone = :rZone")
    .orderBy("recordsuspa.subclass")
    .orderBy("recordsuspa.category", "DESC")
    .orderBy("recordsuspa.record");

    if (recordsByStateParams.abbr.toLocaleLowerCase() == 'national') {
        recordsQuery
        .setParameters({ rStatus: "Current", rZone: 'US National' })
    } else {        
        recordsQuery
        .andWhere("recordsuspa.state = :rState")
        .setParameters({ rStatus: "Current", rZone: 'State', rState: recordsByStateParams.abbr })
    }

    let records = await recordsQuery
//    .skip(5)
    .take(100)
    .getMany();

    return records.map(record => record.toResultsRecordUSPA());
};

const schema = {
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    zone: { type: 'string' },
                    state: { type: 'string' },
                    subclass: { type: 'string' },
                    category: { type: 'string' },
                    record: { type: 'string' },
                    performance: { type: 'string' },
                    recordno: { type: 'string' },
                    uspaclass: { type: 'string' },
                    uspadate: { type: 'string' },
                    location: { type: 'string' },
                    holders: { type: 'string' },
                    notes: { type: 'string' },
                    status: { type: 'string' }
                },
            },
        },
    },
};
