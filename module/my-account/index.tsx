import React from 'react'
import style from "./Account.module.scss"
import classNames from 'classnames/bind'
import { TabsProps, Table, Form, Input, Tabs } from 'antd'
import { ColumnsType } from 'antd/es/table'
import ButtonCustom from '../../components/Button'
import { DollarCircleOutlined } from '@ant-design/icons'
import formRules from '../../constant/formRules'
import PageTitle from '../../components/PageTitle'
import Head from 'next/head'

const cx = classNames.bind(style)

interface DataType {
    key: string,
    order: string,
    date: string,
    status: string,
    total: number

}

const columns: ColumnsType<DataType> = [
    {
        title: 'Order',
        dataIndex: 'order',
        key: 'order',
        render: (order) => <span>{order}</span>

    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        render: (date) => <span>{date}</span>
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (value) => <span>{value}</span>
    },
    {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
        render: (value) => <span>
            <DollarCircleOutlined />
            {value}
            </span>
    },
    {
        title: 'Actions',
        dataIndex: 'action',
        key: 'action',
        render: (_, record) => {
            return (
                <ButtonCustom name="view" />
            )
        }
    },
]

const dataSource: DataType[] = [
    {
        key: '1',
        order: '#26112',
        date: '26-07-2022',
        status: 'hold on',
        total: 1000000

    },
    {
        key: '2',
        order: '#26112',
        date: '26-07-2022',
        status: 'hold on',
        total: 1000000

    },{
        key: '2',
        order: '#26112',
        date: '26-07-2022',
        status: 'hold on',
        total: 1000000

    }
]
export default function Account() {
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: (<span className={cx("tab-header")}>Dashboard</span>),
            children: (
                <>
                    <div >Hello username</div>
                    <div>From your account dashboard you can view your recent 
                        orders, manage your shipping and billing addresses, 
                        and edit your password and account details.
                    </div>
                </>
            )
        },
        {
            key: '2',
            label: (<span className={cx("tab-header")}>Order</span>),
            children: (
                <>
                    <Table dataSource={dataSource} columns={columns} />
                </>
            )
        },
        {
            key: '3',
            label: (<span className={cx("tab-header")}>Account Detail</span>),
            children: (
                <>
                    <Form
                    name="basic"
                    layout= "vertical"
                  
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                   
                    initialValues={{ remember: true }}
                    
                    autoComplete="off"
                    className={cx("form")}
                >
                    <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                    className={cx("form-label")}
                    wrapperCol={{ span: 24 }}
                    >
                    <Input className={cx("form-input")}/>
                    </Form.Item>
                    <br />
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={ [
                                {
                                  required: true,
                                  type: "email",
                                  message: "The input is not valid E-mail!",
                                }
                                
                              ]
                            }       
                        className={cx("form-label")}
                        wrapperCol={{ span: 24 }}
                    >
                    <Input className={cx("form-input")}/>
                    </Form.Item>
                    <br />
                    <Form.Item
                        label="Phone"
                        name="Phone"
                        rules={formRules.phoneRules}
                        className={cx("form-label")}
                        wrapperCol={{ span: 24 }}
                    >
                    <Input className={cx("form-input")}/>
                    </Form.Item>
                    <br />
                    <Form.Item
                        label="Address"
                        name="Address"
                        rules={[{ required: true, message: 'Please input your address!' }]}
                        className={cx("form-label")}
                        wrapperCol={{ span: 24 }}
                    >
                    
                    <Input className={cx("form-input")}/>
                    </Form.Item>
                    <br />
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                        wrapperCol={{ span: 24 }}
                        className={cx("form-label")}
                        >
                        <Input.Password className={cx("form-input")}/>
                    </Form.Item>
                    <br />
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
                        <ButtonCustom name= "save change" htmlType="submit" />
                    </Form.Item>
                    </Form>
                </>
            )
        }
    ]
  return (
    <>
        <Head>
            <title>Fooce | My account</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/icon.png" />
        </Head>
        <PageTitle name="My account" />
        <div className={cx("account")}>
                <Tabs 
                    defaultActiveKey="1" 
                    centered = {true}
                    
                    size="small"
                    className={cx("tabs")}
                    tabPosition='left'
                    items={items} 
                />
        </div>
    </>
  )
}
