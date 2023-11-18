import React, { useState } from 'react'
import classNames from 'classnames/bind'
import Style from "./ChatApp.module.scss"
import { Image } from 'antd'
import { MinusOutlined, SendOutlined } from '@ant-design/icons'

const cx = classNames.bind(Style)
export default function ChatApp() {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenChat = () => {
        if(isOpen === true) setIsOpen(false)
        else setIsOpen(true)
    }

    console.log(isOpen)
  return (
    <div className={cx("chat-app")}>
        {!isOpen ?
            <div className={cx("chat-app-logo")} onClick={handleOpenChat}>
                <Image src={require("../../assets/imgs/chat-logo.png").default.src} className={cx("chat-icon")} preview={false} />
            </div>
            :
            <div className={cx("chat")}>
                <div className={cx("chat-title")}>
                    <div className={cx("title")}>innovia</div>
                    <div className={cx("close")} onClick={handleOpenChat}>
                        <MinusOutlined  className={cx("icon")}/>
                    </div>
                </div>
                <div className={cx("chat-list")}>
                    <div className={cx("list-top")}>
                        
                            <Image src={require("../../assets/imgs/avt-logo.png").default.src} className={cx("list-logo")} preview={false} />
                    
                        <div className={cx("list-title")}>
                            Đây là đoạn chat tự động.
                        </div>
                    </div>
                    <div className={cx("bot")}>
                        <div className={cx("message")}>Xin chào, chúng tôi có thể giúp gì cho bạn! Hãy chọn một vấn đề bạn quan tâm nhé!</div>
                    </div>
                    <div className={cx("user")}>
                        <div className={cx("message")}>Tôi muốn mua hàng!</div>
                    </div>
                    
                </div>
                <div className={cx("chat-input")}>
                    <textarea rows={1}  className={cx("input")} placeholder="Bạn có thắc mắc gì..."/>
                    <SendOutlined className={cx("icon")}/>
                </div>
            </div>
        }
        
        
    </div>
  )
}
