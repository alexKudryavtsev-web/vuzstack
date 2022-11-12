import { DirectionInterface } from '@app/parser/interface/direction.interface';
import { VuzDetailsInterface } from '@app/parser/interface/vuzDetails.interface';

export interface Vuz {
  city: string;
  shortName: string;
  fullName: string;
  detailsUrl: string;
  details: VuzDetailsInterface;
  directions: DirectionInterface[];
}
