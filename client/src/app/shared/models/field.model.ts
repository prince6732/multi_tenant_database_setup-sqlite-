import { FieldTypes } from './fieldtype.model';

export interface Field {
  id: number;
  fieldType: FieldTypes;
  title: string;
  description: string;
  isRequired: boolean;
  order: number;
  min: number;
  max: number;
  status: boolean;
  fields?: Field[];
  subcategoryName: string;
}
