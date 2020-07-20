// https://www.fastify.io/docs/latest/Routes/
import { health } from '@app/plugins';
import config from '@lib/config';
import fastify from 'fastify';

import { auth } from './auth';
import { internal } from './internal';
import { posts } from './posts';
import { profiles } from './profiles';
import { records } from './records';

export const routes: fastify.RoutePlugin = async function(instance, options): Promise<void> {
    instance.register(health);
    instance.register(auth, { prefix: '/auth' });
    instance.register(posts, { prefix: '/posts' });
    instance.register(profiles, { prefix: '/profile' });
    instance.register(records, { prefix: '/records' });

    if (config.internal) {
        instance.register(internal, { prefix: '/internal' });
    }
};
