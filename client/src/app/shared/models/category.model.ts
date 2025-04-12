export interface Category {
  id: number;
  name: string;
  status: boolean;
  parentId: number;
  parentCategoryName: string;
  subcategories?: Category[];
}
