// import { findProfile, findProfileBySlug } from '@app/routes/_shared/profiles';
import { RecordUSPA } from '@lib/orm/entity';
import fastify from 'fastify';

import { RecordsByStateParams, RecordsByStateQuery, ResultsRecordsByState } from '../../../typings';

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
): Promise<ResultsRecordsByState> {
    const recordsByStateQuery: RecordsByStateQuery = request.query as RecordsByStateQuery;
    const recordsByStateParams: RecordsByStateParams = request.params;

    let foundRecords: Array<RecordUSPA> = [];
    

    return foundRecords.map((l: RecordUSPA) => l.toResultsRecordUSPA());
};

const schema = {
    params: {
        type: 'object',
        properties: {
            id: {
                type: 'string',
            },
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                abbr: { type: 'string' },
                state: { type: 'string' }
            },
        },
    },
};
