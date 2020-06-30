import sh from 'shelljs';

import { _handleShellResult } from '../_shared';

process.env.NEW_DB = process.env.TYPE_ORM_DATABASE;
process.env.TYPE_ORM_DATABASE = process.env.NEW_DB;

_handleShellResult(sh.exec(`npm run db:migration:run`));
