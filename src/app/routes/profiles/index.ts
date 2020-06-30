import { health } from '@app/plugins';
import fastify from 'fastify';

import { profileRead } from './profile-read';

export const profiles: fastify.RoutePlugin = async function(instance, options): Promise<void> {
    instance.register(health);
    instance.register(profileRead);
};
