import {sendGet, sendPost} from "./axios";
import config from "../config";
import store from "../redux/store";
import { IUserLogin, ILoginBody, IAccountInfo, ILoginUser, ISignupBody } from "../type";
import axios from "axios";


const path = {
    login: "/API.php",
    signup: "/API.php",
    getUserInfor: "/getUserInfor",
    

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




export default {
    getUserInfor,
    isLogin,
    getAuthToken,
    getIdUser
}