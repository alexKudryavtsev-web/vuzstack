import { VuzEntity } from '../vuz.entity';

export class VuzListWithMetaResponseInterface {
  vuzList: VuzEntity[];
  meta: { total: number; limit: number; offset: number; filtred: number };
}
