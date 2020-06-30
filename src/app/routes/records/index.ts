import { health } from '@app/plugins';
import fastify from 'fastify';

import { recordRead } from './record-read';
export const records: fastify.RoutePlugin = async function(instance, options): Promise<void> {
    instance.register(health);
    instance.register(recordRead);
    // instance.register(recordsByState);
};
