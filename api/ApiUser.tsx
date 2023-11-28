import {sendGet, sendPost} from "./axios";
import store from "../redux/store";
import { IUserLogin, ILoginBody, IAccountInfo, ILoginUser, ISignupBody } from "../type";
import axios from "axios";


const path = {
    login: "http://localhost:8080/login",
    signup: "http://localhost:8080/signup",
    getUserInfor: "https://chippisoft.com/API/getUserInfor",
    updateUser: 'http://localhost:8080/updateUser',
    checkToken: 'http://localhost:8080/checkToken'
};

function isLogin(): boolean {
  return !!getAuthToken();
}

function getAuthToken(): string | undefined {
  const {user} = store.getState();
  return user?.jwt;
}

function getIdUser(): number | undefined {
  const {user} = store.getState();
  return user?.id;
}

function getUserInfor(params:any): Promise<IUserLogin> {
    return sendGet(path.getUserInfor + '/' + params.id, params )
}

export const login = (body: ILoginBody): Promise<any> => {
    return sendPost(path.login,body);
  }

export const signup = (body: ISignupBody): Promise<any> => {
  return sendPost(path.signup,body);
}

export function updateUser(params: any) : Promise<any> {
  return sendPost(path.updateUser, params, {
      Authorization : getAuthToken(),
      "Content-Type": "application/json"
  })
}

export function checkToken(): Promise<any> {
  return sendGet(path.checkToken, null,  {
    Authorization : getAuthToken(),
    "Content-Type": "application/json"
})
}



export default {
    getUserInfor,
    isLogin,
    getAuthToken,
    getIdUser
}