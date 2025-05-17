import { appSchema, tableSchema } from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'missions',
      columns: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'actions',
      columns: [
        { name: 'mission_id', type: 'string', isIndexed: true },
        { name: 'name', type: 'string' },
        { name: 'target_metric', type: 'number' },
        { name: 'metric_unit', type: 'string' },
        { name: 'frequency', type: 'string' }, // 'daily' or 'weekly'
      ],
    }),
    tableSchema({
      name: 'action_logs',
      columns: [
        { name: 'action_id', type: 'string', isIndexed: true },
        { name: 'date', type: 'string' }, // ISO string
        { name: 'achieved_value', type: 'number' },
      ],
    }),
  ],
}); 