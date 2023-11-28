
import React from "react";
import Layout from "../module/layout/layout";
import RouteList, {IRoute} from "./RouteList";
import {AppProps} from "next/app";
import ApiUser, { checkToken } from "../api/ApiUser";
import Login from "../module/login";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/UserSlice";
import { message } from "antd";
import ApiAdmin from "../api/ApiAdmin";
import { useQuery } from "react-query";

export default function Routes({
  Component,
  pageProps,
  router
 
}: AppProps): JSX.Element | null {
 

  
  const dispatch = useDispatch()
  const isPrivateRoute = (): boolean | undefined => {
    for (const route of RouteList) {
      if (router.pathname === route.path) {
        if (route.isPrivate === undefined) {
          if (ApiUser.isLogin()) {
            return route.isPrivate;
          }
          return true;
        }
        return route.isPrivate;
      }
    }
    return false;
  };

  const goToLogin = (): null => {
    if (typeof window !== "undefined") {
      dispatch(logoutUser())
      message.warning('Bạn cần đăng nhập để truy cập trang này!', 5);
      setTimeout(()=>{
          router.push("/login");
      }, 5000)
    }
    
    return null;
  };
  
  if (isPrivateRoute()) {
    if (ApiUser.isLogin()) {
        return (
          <Layout>
            <Component {...pageProps} />
          </Layout>
      ); 
    }
    return goToLogin();
  } else {
    return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
  }

  
}

