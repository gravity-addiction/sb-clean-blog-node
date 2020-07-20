// import { findProfile, findProfileBySlug } from '@app/routes/_shared/profiles';
import { RecordUSPA } from '@lib/orm/entity';
import fastify from 'fastify';

import { RecordParams, RecordQuery, ResultsRecordUSPA } from '../../../typings';

export const recordRead: fastify.RoutePlugin = async function(instance, options): Promise<void> {
    instance.route({
        method: 'GET',
        url: '/id/:id',
        schema,
        handler,
    });
};

export const handler: fastify.RequestHandlerWithParams<RecordParams> = async function(
    request,
    reply
): Promise<ResultsRecordUSPA> {
    const recordQuery: RecordQuery = request.query as RecordQuery;
    const recordParams: RecordParams = request.params;

    const foundRecordUSPA: RecordUSPA = new RecordUSPA();

    return foundRecordUSPA.toResultsRecordUSPA();
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
};
