
export interface IUserLogin {
    id?: number;
    username: string;
    phone: string;
    email: string;
    passwword: string;
    
}

export interface IPermission {
    id: number;
    permissionKey: string;
    permissionName: string;
  }
  

export interface IAccountInfo {
    username?: string;
    id: number;
    jwt?: string;
    role?:  string;
      
    
}

export interface ILoginUser {
  status: string;
  data: string;
  jwt: string;
  isAdmin: string;
}

export interface ILoginBody{
  username: string;
  password: string;
}

export interface ISignupBody{
  username: string;
  phone: string;
  email: string;
  passwword: string;
  fullname: string;
}