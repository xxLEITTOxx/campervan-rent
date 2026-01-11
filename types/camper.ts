export interface GalleryImage {
  thumb: string;
  original: string;
}

export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  adults?: number;
  engine: string;
  transmission: string;
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  description: string;
  AC?: boolean;
  bathroom?: boolean;
  kitchen?: boolean;
  TV?: boolean;
  radio?: boolean;
  refrigerator?: boolean;
  microwave?: boolean;
  gas?: boolean;
  water?: boolean;
  gallery?: GalleryImage[];
  reviews?: Review[];
}

export interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

export interface CamperFilters {
  location?: string;
  form?: string; // Van, Fully Integrated, Alcove
  AC?: boolean;
  automatic?: boolean;
  kitchen?: boolean;
  TV?: boolean;
  shower?: boolean;
  page?: number;
  limit?: number;
}

