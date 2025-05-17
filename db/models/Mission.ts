import { Model } from '@nozbe/watermelondb';
import { children, field } from '@nozbe/watermelondb/decorators';
import 'reflect-metadata';

export default class Mission extends Model {
  static table = 'missions';

  @field('title') title!: string;
  @field('description') description?: string;
  @field('created_at') created_at!: number;

  // WatermelonDB children relationship to actions
  @children('actions') actions!: any;
}

export { };

