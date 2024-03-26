export interface IBrand {
  _id: string;
  slug: string;
  name: string;
  description?: string;
  imageUrl: string;
}
export interface ICategory {
  _id: string;
  slug: string;
  name: string;
  description?: string;
  imageUrl: string;
}

export interface ICar {
  _id: string;
  name: string;
  description?: string; // Optional
  slug?: string; // Optional
  imagesUrl: string[];
  modelYear: number;
  seater: number;
  powerHorse: number;
  kilometersIncluded: number;
  rentalCost: number;
  relatedVideo?: string; // Optional
  categoryId?: string; // Optional reference
  brandId?: string; // Optional reference
}

export interface ICreateUserParams {
  clerkId?: string;
  email?: string;
  firstName: String;
  lastName: String;
  image: String;
}

export interface ICreateCategoryParams {
  name: string;
  slug?: String;
  description?: String;
  imageUrl?: String;
  createdBy?: string;
}
export interface ICreateBrandParams {
  name: string;
  slug?: String;
  description?: String;
  imageUrl?: String;
  createdBy?: string;
}
export interface IUpdateCategoryParams {
  name?: string;
  description?: String;
  imageUrl?: String;
}
export interface IUpdateBrandParams {
  name?: string;
  description?: String;
  imageUrl?: String;
}
