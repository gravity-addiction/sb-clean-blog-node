import httpCodes from '@inip/http-codes';
import { Profile } from '@lib/orm/entity';
import { PeopleCrossed } from '@lib/orm/entity/people-crossed';
import { UspaPeople } from '@lib/orm/entity/uspa-people';
import fastify from 'fastify';
import { getConnection, ObjectLiteral } from 'typeorm';

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

export const findProfileByKeywords = async function(
    request: fastify.FastifyRequest,
    keywords: string
): Promise<Array<Profile>> {
    /*
    SELECT * FROM profile WHERE
    name LIKE '%Ste%' AND
    name LIKE '%Hu%'
    OR people_id = ANY(
        SELECT master_id FROM people_crossed WHERE child_id = ANY(SELECT id FROM uspa_people WHERE name LIKE '%Ste%' AND name LIKE '%Hu%')
    )
    */

    // Split String by Spaces
    const arrKeywords = keywords.split(' ').filter(k => k.trim() !== '');
    const arrKi = arrKeywords.length;
    if (arrKi <= 0) {
        return [];
    }

    let sqlPeople = '';
    const objPeople: ObjectLiteral = {};
    for (let i = 0; i < arrKi; i++) {
        if (i > 0) {
            sqlPeople += ' AND ';
        }
        sqlPeople += `name LIKE :a${i}`;
        objPeople['a' + i] = `%${arrKeywords[i]}%`;
    }
    const sql = `SELECT * FROM profile WHERE ${sqlPeople} OR people_id = ANY(SELECT master_id FROM people_crossed WHERE child_id = ANY(select id FROM uspa_people WHERE ${sqlPeople})) ORDER BY slug LIMIT 100`;

    const [query, parameters] = getConnection().driver.escapeQueryWithParameters(
        sql,
        objPeople,
        {}
    );

    const profilesQuery = getConnection().query(query, parameters);
    return profilesQuery;
};
