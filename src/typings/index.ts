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

export interface IBooking {
  _id: string;
  fullName: string;
  mobilePhone: string;
  specialRequest?: string; // Optional string property
  rentalStartDate: Date;
  rentalEndDate: Date;
  // carId: string;
  carNameAndModel: string;
  status: "Pending" | "Received"; // Enforces enum values
  createdAt: Date; // Inherited from timestamps: true
  updatedAt: Date; // Inherited from timestamps: true
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
