import httpCodes from '@inip/http-codes';
import { Profile } from '@lib/orm/entity';
import fastify from 'fastify';
import { getConnection } from 'typeorm';

import { ReadProfileErrorCodes } from '../../../typings';

export const findProfile = async function(
    request: fastify.FastifyRequest,
    id: UUID
): Promise<Profile> {
    const profileRepository = getConnection().getRepository(Profile);
    let foundProfile: Profile | undefined;

    try {
        foundProfile = await profileRepository.findOne(id);
    } catch (error) {
        throw request.generateError<ReadProfileErrorCodes>(
            httpCodes.INTERNAL_SERVER_ERROR,
            'ERROR_FINDING_PROFILE',
            error
        );
    }

    if (!foundProfile) {
        throw request.generateError<ReadProfileErrorCodes>(
            httpCodes.NOT_FOUND,
            'PROFILE_NOT_FOUND'
        );
    }

    return foundProfile;
};

export const findProfileBySlug = async function(
    request: fastify.FastifyRequest,
    id: string
): Promise<Profile> {
    const profileRepository = getConnection().getRepository(Profile);
    let foundProfile: Profile | undefined;

    try {
        foundProfile = await profileRepository.findOne({
            slug: id,
        });
    } catch (error) {
        throw request.generateError<ReadProfileErrorCodes>(
            httpCodes.INTERNAL_SERVER_ERROR,
            'ERROR_FINDING_PROFILE',
            error
        );
    }

    if (!foundProfile) {
        throw request.generateError<ReadProfileErrorCodes>(
            httpCodes.NOT_FOUND,
            'PROFILE_NOT_FOUND'
        );
    }

    return foundProfile;
};
