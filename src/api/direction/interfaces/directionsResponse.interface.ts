import { DirectionEntity } from '../direction.entity';

export class DirectionsResponseInterface {
  directions: DirectionEntity[];
  meta: { total: number; limit: number; offset: number; filtred: number };
}
