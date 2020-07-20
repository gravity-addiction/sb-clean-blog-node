import { findProfile, findProfileBySlug } from '@app/routes/_shared/profiles';
import { Profile } from '@lib/orm/entity';
import fastify from 'fastify';

import { ReadProfileParams, ReadProfileQuery, ResultsProfile } from '../../../typings';

export const profileRead: fastify.RoutePlugin = async function(instance, options): Promise<void> {
    instance.route({
        method: 'GET',
        url: '/:profile',
        schema,
        handler,
    });
};

export const handler: fastify.RequestHandlerWithParams<ReadProfileParams> = async function(
    request,
    reply
): Promise<ResultsProfile> {
    const readProfileQuery: ReadProfileQuery = request.query as ReadProfileQuery;
    const readProfileParams: ReadProfileParams = request.params;

    const foundProfile: Profile = await findProfileBySlug(request, readProfileParams.profile);
    return foundProfile.toResultsProfile();
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
                slug: { type: 'string' },
                name: { type: 'string' },
                people_id: { type: 'string' },
            },
        },
    },
};
