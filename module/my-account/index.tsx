import React, { useState } from 'react'
import style from "./Account.module.scss"
import classNames from 'classnames/bind'
import { TabsProps, Table, Form, Input, Tabs, Modal, Button, Image, message } from 'antd'
import { ColumnsType } from 'antd/es/table'
import ButtonCustom from '../../components/Button'
import formRules from '../../constant/formRules'
import PageTitle from '../../components/PageTitle'
import Head from 'next/head'
import store from '../../redux/store'
import { useMutation, useQuery } from 'react-query'
import { cancelOrder, getListOrder, getOrderItem } from '../../api/ApiProduct'
import { useRouter } from 'next/router'
import { formatCurrency } from '../../constant/currencyFormatter'
import ApiUser, { updateUser } from '../../api/ApiUser'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../redux/slices/UserSlice'

const cx = classNames.bind(style)

interface DataType {
    key: string,
    id: string,
    date: string,
    status: string,
    total: number

}


export default function Account() {
    const {user} = store.getState();
    const dispatch = useDispatch()
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idOrder, setIdOrder] = useState("");
    const {data: orderList, refetch} = useQuery(["orderList"], () => getListOrder(ApiUser.getIdUser()))
    const {data: orderItem} = useQuery(['orderItem', idOrder], () => getOrderItem({id:idOrder, auth: ApiUser.getIdUser()}),
        {
            enabled: idOrder !== ""
        }
    )
    const deleteOrderItem = useMutation(
        async (payload: any) => await cancelOrder(payload),
        {
            onSuccess: async (data: any) => {
       
                if(data.status === "success") {
                    message.success("Bạn đã huỷ đơn hàng!")
                } else if(data.status === "failed"){
                    message.error("Có lỗi xảy ra, vui lòng thử lại!")
                } else if(data.status === "ExpiredToken"){
                    message.error("Hết phiên đăng nhập, vui lòng đăng nhập lại!")
                   dispatch(logoutUser())
                        message.warning('Bạn cần đăng nhập lại để truy cập trang này!', 5);
                        setTimeout(()=>{
                            router.push("/login");
                    }, 5000)
                }
                refetch()
            }
        }
    )
    const updateUserMutation = useMutation(
        async (payload: any) => await updateUser(payload),
        {
            onSuccess: async (data: any) => {
       
                if(data.status === "success") {
                    message.success("Cập nhật thông tin thành công! Hãy đăng nhập lại")
                    dispatch(logoutUser())
                    setTimeout(()=>{
                        router.push("/login");
                    }, 5000)
                } else if(data.status === "failed"){
                    message.error("Có lỗi xảy ra, vui lòng thử lại!")
                } else if(data.status === "ExpiredToken"){
                    message.error("Hết phiên đăng nhập, vui lòng đăng nhập lại!")
                    dispatch(logoutUser())
                    message.warning('Bạn cần đăng nhập lại để truy cập trang này!', 5);
                    setTimeout(()=>{
                        router.push("/login");
                    }, 5000)
                }
                
            }
        }
    )

    const onChange = (key: String) => {
        router.push(`/my-account?tabs=${key}`)
    }
    
    const show = (id) => {
        setIsModalOpen(true);
        setIdOrder(id)
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values) => {
        updateUserMutation.mutate({
            fullname: values.fullname,
            password: values.password,
            phone: values.phone,
            iduser: ApiUser.getIdUser()
        })
    }
    const initialValues = {
        username: user?.username,
        email: user?.email,
        fullname: user?.fullname,
        phone: user?.phone,
    };
    const columns: ColumnsType<DataType> = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'id',
            key: 'order',
            render: (id) => <span>{id}</span>
    
        },
        {
            title: 'Ngày đặt hàng',
            dataIndex: 'date',
            key: 'date',
            render: (date) => <span>{date}</span>
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => <span>{status}</span>
        },
        {
            title: 'Tổng thanh toán',
            dataIndex: 'total',
            key: 'total',
            render: (value) => <span>
                {formatCurrency(value)} VNĐ
                </span>
        },
        {
            title: 'Xem',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => {
                return (
                    <>
                        <Button className={cx('view-btn')} onClick={() => show(record.id)}>Xem</Button>
                        <Button 
                            className={cx('delete-btn', 'view-btn')} 
                            onClick={() => {
                                Modal.confirm({
                                  title: 'Xác nhận huỷ đơn',
                                  content: 'Bạn có chắc chắn muốn huỷ đơn hàng không ?',
                                  onOk: () => {
                                    deleteOrderItem.mutate({
                                        id: record.id,
                                        auth: ApiUser.getIdUser()
                                    })
                                  }
                                });
                              }}
                            >Huỷ</Button>
                    </>
                    
                )
            }
        },
    ]
    const items: TabsProps['items'] = [
        {
            key: 'dashboard',
            label: (<span className={cx("tab-header")}>Dashboard</span>),
            children: (
                <>
                    <div >Xin chào {user?.username}</div>
                    <div>Từ trang cá nhân, bạn có thể xem danh sách đơn hàng, chi tiết đơn hàng và thông tin cá nhân. Chúc bạn có trải nghiệm mua sắm vui vẻ!
                    </div>
                </>
            )
        },
        {
            key: 'order',
            label: (<span className={cx("tab-header")}>Đơn hàng</span>),
            children: (
                <>
                    <Table dataSource={orderList?.data} columns={columns} />
                </>
            )
        },
        {
            key: 'account',
            label: (<span className={cx("tab-header")}>Tài khoản</span>),
            children: (
                <>
                    <Form
                    name="basic"
                    layout= "vertical"
                    onFinish={onFinish}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={initialValues}
                    autoComplete="off"
                    className={cx("form")}
                >
                    <Form.Item
                    label="Username"
                    name="username"
                    className={cx("form-label")}
                    wrapperCol={{ span: 24 }}
                    >
                    <Input className={cx("form-input")} disabled />
                    </Form.Item>
                    <Form.Item
                    label="Full name"
                    name="fullname"
                    rules={[
                        { required: true, message: 'Hãy nhập tên của bạn!' }
                       
                    ]}
                    className={cx("form-label")}
                    wrapperCol={{ span: 24 }}
                    
                    >
                    <Input className={cx("form-input")} />
                    </Form.Item>
                    <br />
                    <Form.Item
                        label="Email"
                        name="email"
                        className={cx("form-label")}
                        wrapperCol={{ span: 24 }}
                    >
                    <Input className={cx("form-input")} disabled/>
                    </Form.Item>
                    <br />
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={formRules.phoneRules}
                        className={cx("form-label")}
                        wrapperCol={{ span: 24 }}

                    >
                    <Input className={cx("form-input")} />
                    </Form.Item>
                    <br />
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={formRules.passwordRules}
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
                            message: 'Hãy nhập lại mật khẩu một lần nữa!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Mật khẩu không khớp!'));
                            },
                        }),
                        ]}
                    >
                        <Input.Password className={cx("form-input")}/>
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 24 }}>
                        <ButtonCustom name= "Lưu thay đổi" htmlType="submit" />
                    </Form.Item>
                    </Form>
                </>
            )
        }
    ]
  return (
    <>
        <Head>
            <title>Tài khoản</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/icon.png" />
        </Head>
        <PageTitle name="Tài khoản" />
        <div className={cx("account")}>
                <Tabs 
                    defaultActiveKey="dashboard" 
                    centered = {true}
                    size="small"
                    className={cx("tabs")}
                    tabPosition='left'
                    items={items} 
                    onChange={onChange}
                />
        </div>
        <Modal title={`Chi tiết đơn hàng ${orderItem?.data.id}`} width={800} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            {
                orderItem?.data.product.map((item, index)=> {
                    const image = item.image.split(";")
                    return (
                        <div className={cx('order-item')} key={index}>
                            <Image src={image[0]} className={cx("item-image")}/>
                    
                        <div className={cx('item-detail')}>
                            <div className={cx('item-name')}>
                               {item.name}
                            </div>
                            <div className={cx('item-quantity')}>
                               x{item.quantity}
                            </div>
                        </div>
                        <div className={cx('item-total')}>
                                {item.price ? formatCurrency(item.price) : null}
                         
                        </div>
                        </div>
                    )
                })
            }
           
            <div className={cx('order-total')}>
                <span className={cx('total-title')}>Tổng thanh toán:</span>
                <span className={cx('total')}>{orderItem?.data ? formatCurrency(orderItem?.data.total) : null} {" "} VNĐ</span>
            </div>
        </Modal>
    </>
  )
}
