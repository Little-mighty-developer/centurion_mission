import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import Action from './models/Action';
import ActionLog from './models/ActionLog';
import Mission from './models/Mission';
import schema from './schema';

const adapter = new SQLiteAdapter({
  schema,
});

const database = new Database({
  adapter,
  modelClasses: [Mission, Action, ActionLog],
});

export default database;
