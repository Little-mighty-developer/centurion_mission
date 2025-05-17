import { Model } from '@nozbe/watermelondb';
import { children, field, relation } from '@nozbe/watermelondb/decorators';

export default class Action extends Model {
  static table = 'actions';

  @field('name') name!: string;
  @field('target_metric') target_metric!: number;
  @field('metric_unit') metric_unit!: string;
  @field('frequency') frequency!: string; // 'daily' or 'weekly'

  @relation('missions', 'mission_id') mission!: any;
  @children('action_logs') action_logs!: any;
}
