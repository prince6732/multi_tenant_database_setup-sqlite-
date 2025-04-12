import { Location } from './location.model';

export interface Post {
  id: number;
  userId: number;
  userName?: string;
  title: string;
  description: string;
  price: number;
  categoryId: number;
  categoryName?: string;
  activatedAt?: Date;
  primaryImage: string;
  images: string[];
  data: any;
  status: string;
  createdAt: Date;
  location: Location;
}
