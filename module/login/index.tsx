import React, { useRef, useState } from 'react'
import style from "./Login.module.scss"
import classNames from 'classnames/bind'
import { Button, Checkbox, Form, Image, Input, message, Tabs, TabsProps } from 'antd'
import Head from 'next/head'
import ButtonCustom from '../../components/Button'
import formRules from '../../constant/formRules'
import { useMutation } from 'react-query'
import {login, signup} from "../../api/ApiUser"
import { useDispatch } from 'react-redux'
import { loginUser } from '../../redux/slices/UserSlice'
import { ILoginBody, ISignupBody } from '../../type'



const cx = classNames.bind(style)
function Login() {
    const dispatch = useDispatch()
    const [messageApi, contextHolder] = message.useMessage();
    const loginMutation = useMutation( 
        async (payload: any) => await login(payload), 
        {
          onSuccess: async (data: any) => {
            try {
                if(data.status === "success"){
                    dispatch(loginUser({
                        username: data.info_user[0].username,
                        id: data.info_user[0].id,
                        jwt: data.jwt,
                        role: data.isAdmin
                    }));
                    window.location.replace("/");
                } else {
                    messageApi.open({
                        type: 'error',
                        content: 'username or password is incorrect, please try again later',
                    });
                     
                }
            } catch (error) {
              console.error("Error in onSuccess:", error);
              
            }
          },
          onError: () => {
           
          },
        });
    
    const signupMutation = useMutation(
        async (payload : any) => await signup(payload), {
            onSuccess: async (data : any) => {
                try{
                    if(data.status === "success") {
                        messageApi.open({
                            type: 'success',
                            content: 'successful registration, please return to the login page',
                        });
                    } else {
                        messageApi.open({
                            type: 'error',
                            content: `${data.data}`,
                        });
                    }
                } catch (error) {
                    console.error("Error in onSuccess:", error);
                }
            },
            onError: () => {

            }
        }
    )
    const onChange = (key:string) => {
       
    }

    const onHandleLogin = (value: ILoginBody) => {
        const res =loginMutation.mutate(value)
    }

    const onHanldeSignup = (value : ISignupBody) => {
        
        signupMutation.mutate(value)
    }

 
    const items: TabsProps['items'] = [
        {
          key: '1',
          label: (<span className={cx("tab-header")}>Login</span>),
          children: (
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                layout="vertical"
                autoComplete="off"
                className={cx("form")}
                onFinish={onHandleLogin}
            >
                <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
                wrapperCol={{ span: 24 }}
                className={cx("form-label")}
                
                >
                <Input 
                className={cx("form-input")}
               
                
                />
                </Form.Item>

                <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                wrapperCol={{ span: 24 }}
                className={cx("form-label")}
                >
                <Input.Password 
             
                className={cx("form-input")}
               
                />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ span: 24 }} >
                <Checkbox >Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ span: 24 }}>
                <Button className= {cx("btn")} htmlType='submit' >login</Button>
                </Form.Item>
            </Form>
          ),
        },
        {
          key: '2',
          label: (<span className={cx("tab-header")}>Signup</span>),
          children:( 
          <Form
            name="basic"
            layout= "vertical"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={onHanldeSignup}
            className={cx("form")}
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                      required: true,
                      type: "email",
                      message: "The input is not valid E-mail!",
                    }
                    
                  ]}
                className={cx("form-label")}
                wrapperCol={{ span: 24 }}
            >
            <Input className={cx("form-input")}/>
            </Form.Item>
           
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
                className={cx("form-label")}
                wrapperCol={{ span: 24 }}
            >
            <Input className={cx("form-input")}/>
            </Form.Item>
           
            <Form.Item
                label="Fullname"
                name="fullname"
                rules={[{ required: true, message: 'Please input your fullname!' }]}
                className={cx("form-label")}
                wrapperCol={{ span: 24 }}
            >
            <Input className={cx("form-input")}/>
            </Form.Item>
          
            <Form.Item
                label="Phone"
                name="phone"
                rules={formRules.phoneRules}
                className={cx("form-label")}
                wrapperCol={{ span: 24 }}
            >
            <Input className={cx("form-input")}/>
            </Form.Item>
        
            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                wrapperCol={{ span: 24 }}
                className={cx("form-label")}
                >
                <Input.Password className={cx("form-input")}/>
            </Form.Item>
         
            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                wrapperCol={{ span: 24 }}
                hasFeedback
                rules={[
                {
                    required: true,
                    message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('The new password that you entered do not match!'));
                    },
                }),
                ]}
            >
                <Input.Password className={cx("form-input")}/>
            </Form.Item>
            

            <Form.Item wrapperCol={{ span: 24 }}>
                <Button className={cx("btn")} htmlType="submit">signup</Button>
            </Form.Item>
        </Form>),
        }
      ];

    
  return (
    <>
         <Head >
            <title>Fooce | Login - Signup</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/icon.png" />
        </Head>
        <div className={cx('login')}>
            {contextHolder}
            <Image src={require("../../assets/imgs/sign-bg.png").default.src} alt="sign-bg" preview={false} className={cx('login-image')}/>
            <Tabs 
                defaultActiveKey="1" 
                centered = {true}
                onChange={onChange} 
                size="small"
                className={cx("tabs")}
                // style={{ backgroundColor: 'transparent', padding: '16px' }}
                items={items}
            >
               
            </Tabs>
        </div>
    </>
  )
}

export default Login
