import { DirectionEntity } from '../direction.entity';

export class DirectionsWithMetaResponseInterface {
  directions: DirectionEntity[];
  meta: { total: number; limit: number; offset: number; filtred: number };
}
