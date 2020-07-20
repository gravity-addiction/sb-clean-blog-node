import {
    findProfile,
    findProfileByKeywords,
    findProfileBySlug,
} from '@app/routes/_shared/profiles';
import { Profile } from '@lib/orm/entity';
import fastify from 'fastify';

import { ResultsProfileSearch, SearchProfileQuery } from '../../../typings';

export const profileSearch: fastify.RoutePlugin = async function(instance, options): Promise<void> {
    instance.route({
        method: 'GET',
        url: '/search',
        schema,
        handler,
    });
};

export const handler: fastify.RequestHandler = async function(
    request,
    reply
): Promise<ResultsProfileSearch> {
    const readProfileQuery: SearchProfileQuery = request.query as SearchProfileQuery;

    const foundProfiles: Array<Profile> = await findProfileByKeywords(
        request,
        readProfileQuery.keywords
    );

    console.log('Ret', foundProfiles);
    return {
        keywords: readProfileQuery.keywords,
        results: foundProfiles,
    };
};

const schema = {
    params: {
        type: 'object',
        properties: {
            keywords: {
                type: 'string',
            },
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                keywords: { type: 'string' },
                results: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            people_id: { type: 'number' },
                            slug: { type: 'string' },
                            name: { type: 'string' },
                        },
                    },
                },
            },
        },
    },
};
