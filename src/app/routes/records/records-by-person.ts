// import { findProfile, findProfileBySlug } from '@app/routes/_shared/profiles';
import { RecordUSPA } from '@lib/orm/entity';
import fastify from 'fastify';
import { getConnection } from 'typeorm';

import { RecordsByPersonParams, ResultsRecordsByPerson, ResultsRecordUSPA } from '../../../typings';

export const recordsByPerson: fastify.RoutePlugin = async function(
    instance,
    options
): Promise<void> {
    instance.route({
        method: 'GET',
        url: '/person/:id',
        schema,
        handler,
    });
};

export const handler: fastify.RequestHandlerWithParams<RecordsByPersonParams> = async function(
    request,
    reply
): Promise<ResultsRecordUSPA[]> {
    const recordsByPersonParams: RecordsByPersonParams = request.params;

    const recordsRepository = getConnection().getRepository(RecordUSPA);
    const recordsQuery = recordsRepository.query('CALL records_by_people(?)', [
        recordsByPersonParams.id,
    ]);

    const records = await recordsQuery;
    return records[0]; // .map((record: RecordUSPA) => record.toResultsRecordUSPA());
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
                    status: { type: 'string' },
                },
            },
        },
    },
};
