import NameEventConstant from "../check_event/NameEventConstant";

export interface IRoute {
  path: string;
  name: string;
  isUnderline?: boolean;
  isPrivate?: boolean;
  isPublic?: boolean;
  isUpdating?: boolean;
  isAuth?: boolean;
  isSSR?: boolean;
  children?: IRoute[];
}

const routes: IRoute[] = [
  
  {
    path: "/about-us",
    name: "About us",
    isPrivate: false,
 
    isUnderline: true,
  },
  {
    path: "/admin",
    name: "Admin",
    isPrivate: true,
    isUnderline: true,
  },
  {
    path: "/cart",
    name: "Cart",
    isPrivate: true,
    isUnderline: false,
  },
  {
    path: "/checkout",
    name: "Check out",
    isPrivate: true,
    
  },
  {
    path: "/food",
    name: "Food",
    isPrivate: false,
    isUnderline: true,
  },
  {
    path: "/juice",
    name: "Juice",
    isPrivate: false,
    isUnderline: true,
  },
  {
    path: "/login",
    name: "Login",
    isPrivate: false,
    isUnderline: false,
  },
  {
    path: "/my-account",
    name: "My account",
    isPrivate: true,
    isUnderline: false,
  },
  {
    path: "/our-menu",
    name: "Our menu",
    isPrivate: false,
    isUnderline: true,
  },
  {
    path: "/product",
    name: "Product",
    isPrivate: false,
    isUnderline: false,
  },
  {
    path: "/",
    name: "Fooce",
    isPrivate: false,
    isUnderline: true,
  },
];

export default routes;
