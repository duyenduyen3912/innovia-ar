import React, { useState } from 'react'
import classNames from 'classnames/bind'
import Style from "./ChatApp.module.scss"
import { Image } from 'antd'
import { MinusOutlined, SendOutlined } from '@ant-design/icons'
import "animate.css"
import { useQuery } from 'react-query'
import { getAnswer } from '../../api/ApiChat'
const cx = classNames.bind(Style)
export default function ChatApp() {
    const [isOpen, setIsOpen] = useState(false);
    const [question, setQuestion] = useState('');
    const [chatList, setChatList] = useState([]);
    const {data : answer} = useQuery(["answer", question], () => getAnswer(question))
    const list_answer = [
        {
            option_id: "chat_option_1",
            question_name: "Làm thế nào để đặt hàng ?"
        },
        {
            option_id: "chat_option_2",
            question_name: "Chính sách đổi trả của cửa hàng."
        },
        {
            option_id: "chat_option_3",
            question_name: "Các sản phẩm chính của cửa hàng là gì ?"
        },
        {
            option_id: "chat_option_4",
            question_name: "Cách vận chuyển của cửa hàng như thế nào ?"
        }
    ]
    const handleOpenChat = () => {
        if(isOpen === true) {
            document.getElementById("chat").classList.add("animate__fadeOutDownBig")
            setTimeout(()=>{
                setIsOpen(false)
            }, 300)
            
        }
        else {
            setIsOpen(true)
        }
    }
    const handleSelectQuestion = (quesion) => {
        setChatList(prev => [...prev, quesion.question_name])
        setQuestion(quesion.option_id)
   
    }

    if(answer) console.log(answer)
    console.log("chat", chatList)
  return (
    <div className={cx("chat-app")}>
        {!isOpen ?
            <div className={cx("chat-app-logo")} onClick={handleOpenChat}>
                <Image src={require("../../assets/imgs/chat-logo.png").default.src} className={cx("chat-icon")} preview={false} />
            </div>
            :
            <div className={ `animate__animated animate__fadeInUpBig ${cx("chat")}`} id="chat">
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
                        <div className={cx("message")}>Xin chào, chúng tôi có thể giúp gì cho bạn! Hãy chọn một vấn đề bạn quan tâm nhé!
                            <ul className={cx('chat-options')}>
                                {
                                    list_answer.map((item) => {
                                        return (
                                             <li className={cx('chat-item')} onClick={() => handleSelectQuestion(item)}>
                                                {item.question_name}
                                            </li>
                                        )
                                    })
                                }
                               
                            </ul>
                        </div>
                    </div>
                    { 
                        chatList.map((item, index) => {
                            return (
                                <div className={cx("user")}>
                                    <div className={cx("message")}>{item}</div>
                                </div>
                            )
                        })
                    }
                    
                    
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
