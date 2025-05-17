import { Model } from '@nozbe/watermelondb';
import { field, relation } from '@nozbe/watermelondb/decorators';

export default class ActionLog extends Model {
  static table = 'action_logs';

  @field('date') date!: string;
  @field('achieved_value') achieved_value!: number;

  @relation('actions', 'action_id') action!: any;
}
