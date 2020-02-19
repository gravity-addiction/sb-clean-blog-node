import sh from 'shelljs';

import { _handleShellResult } from '../shared';

process.env.NEW_DB = process.env.TYPE_ORM_DATABASE;
process.env.TYPE_ORM_DATABASE = 'template1';

_handleShellResult(sh.exec(`npm run cli -- query "DROP DATABASE IF EXISTS $NEW_DB"`));
_handleShellResult(sh.exec(`npm run cli -- query "CREATE DATABASE $NEW_DB"`));

process.env.TYPE_ORM_DATABASE = process.env.NEW_DB;

_handleShellResult(sh.exec(`npm run db:migration:run`));