import { LucideIcon } from "lucide-react";

export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    stock?: number;
    categoryId: number;
    image: string;
    quantity?: number;
}

export interface ICategory{
    id: number;
    name: string;
    icon: LucideIcon;
    slug: string;
    keywords: string[];
}

enum Role{
    ADMIN = "admin",
    USER = "user"
}

export interface IUser{
    id: number;
    name: string;
    email: string;
    address: string;
    phone: string;
    role: Role;
    bgColor?: string;
}
export interface ILogin {
    email: string;
    password: string;
};

export interface IRegister {
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
}

export interface IUserSession {
    token: string;
    user:IUser;
    avatar?:string;
    bgColor?: string;
}

export interface IOrder {
    id: number,
    date: Date,
    total: number,
    status: string,
    products: IProduct[]
}