export interface ILoginResponse {
  accessToken: string;
  expiresIn: number
}

export interface IResponse<T> {
  data: T;
}

export interface IUser {
  id?: number;
  name?: string;
  lastname?: string;
  email?: string;
  password?: string;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
  authorities?: IAuthority[];
  role?: IRole
  photo?: string;
}

export interface IAuthority {
  authority: string;
}

export interface IFeedBackMessage {
  type?: IFeedbackStatus;
  message?: string;
}

export enum IFeedbackStatus {
  success = "SUCCESS",
  error = "ERROR",
  default = ''
}

export enum IRoleType {
  admin = "ROLE_ADMIN",
  user = "ROLE_USER",
  superAdmin = 'ROLE_SUPER_ADMIN'
}

export interface IRole {
  createdAt?: string;
  description?: string;
  id ?: number;
  name?: string;
 
  updatedAt?: string;
}

export interface IGame {
  id?: number;
  name?: string;
  imgURL?: string;
  status?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IOrder {
  id?: number;
  description?: string;
  total?: number;
}

export interface ISearch {
  page?: number;
  size?: number;
  pageNumber?: number;
  pageSize?: number;
  totalElements?: number;
  totalPages?:number;
}

export interface IProduct {
  id?: number;
  nombre?: string;
  descripcion?: string;
  precio?: number;
  cantidadEnStock?: number;
  categoria?: ICategoria
}
export interface ICategoria {
  id?: number;
  nombre?: string;
  descripcion?: string;
}


export interface Resource {
  id: number;
  name: string;
  price: number;
  availability: boolean;
  location: string;
  providerName: string;
  providerContact: string;
  providerRating: number;
  description: string;
}


export interface SolicitudRecursos{
  id: number;
  resourceId: number;
  quantity: number;
  eventDate: Date;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Modified' | 'Cancelled';
}

export interface Cotizacion {
  id: number;
  event: string;
  service: string;
  quotedAmount: number;
  resourceQuantity?: number;
  status: 'Sent' | 'Accepted' | 'Rejected';
}
