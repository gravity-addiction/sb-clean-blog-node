import { findProfile, findProfileBySlug } from '@app/routes/_shared/profiles';
import { Profile } from '@lib/orm/entity';
import fastify from 'fastify';

import { ReadProfileParams, ReadProfileQuery, ResultsProfile } from '../../../typings';

export const profileRead: fastify.RoutePlugin = async function(instance, options): Promise<void> {
    instance.route({
        method: 'GET',
        url: '/:id',
        schema,
        handler,
    });
};

export const handler: fastify.RequestHandlerWithParams<ReadProfileParams> = async function(
    request,
    reply
): Promise<ResultsProfile> {
    console.log('Here!');
    const readProfileQuery: ReadProfileQuery = request.query as ReadProfileQuery;
    const readProfileParams: ReadProfileParams = request.params;

    let foundProfile: Profile;

    if (readProfileQuery.findBy === 'slug') {
        console.log('A');
        foundProfile = await findProfileBySlug(request, readProfileParams.id);
    } else {
        console.log('B');
        foundProfile = await findProfile(request, readProfileParams.id);
    }

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
            },
        },
    },
};
