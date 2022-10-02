import { VuzEntity } from '../vuz.entity';

export class VuzListWithMetaResponseInterface {
  vuzList: VuzEntity[];
  meta: { total: number; filtred: number };
}
