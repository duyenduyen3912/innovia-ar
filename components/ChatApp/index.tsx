import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import Style from "./ChatApp.module.scss"
import { Image } from 'antd'
import { MinusOutlined, SendOutlined } from '@ant-design/icons'
import "animate.css"
import { useQuery } from 'react-query'
import { getAnswer } from '../../api/ApiChat'
import { useRouter } from 'next/router'
const cx = classNames.bind(Style)
export default function ChatApp() {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);
    const [question, setQuestion] = useState({
        option_id: "",
        question_name: ""
    });
    const [chatList, setChatList] = useState([{
        question: "",
        answer: "",
        action: "",
        image:""
    }]);
    const {data : answer} = useQuery(["answer", question.option_id], () => getAnswer(question.option_id), {
        enabled: question.option_id !== ""
    })
   
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
        setQuestion(quesion)
    }
    useEffect(()=> {
        if(answer) {
            setChatList(prev => [...prev,{
                question: question.question_name,
                answer: answer.answer,
                action: answer.action,
                image: answer.image
            }])
        }
    }, [answer])
    useLayoutEffect(() => {
        const chatListElement = document.getElementById("chatList");
    
        if (chatListElement) {
          chatListElement.scrollTop = chatListElement.scrollHeight;
        }
      }, [chatList]);
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
                <div className={cx("chat-list")} id="chatList" style={{ scrollBehavior: 'smooth' }}>
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
                                    list_answer.map((item, index) => {
                                        return (
                                             <li key={index} className={cx('chat-item')} onClick={() => handleSelectQuestion(item)}>
                                                {item.question_name}
                                            </li>
                                        )
                                    })
                                }
                               
                            </ul>
                        </div>
                    </div>
                    { chatList.length > 1 ?
                        chatList.map((item, index) => {
                            if(index !== 0)
                            return (
                                <div key={index}>
                                <div className={cx("user")}>
                                    <div className={cx("message")}>{item.question}</div>
                                </div>
                            
                                    <div className={cx("bot")}>
                                        <div className={cx("message")}>
                                            {
                                                item?.answer
                                            }
                                        </div>
                                    </div>
                                    {
                                        item?.image !== null ?
                                        <div className={cx("bot")}>
                                            <div className={cx("message")}>Dưới đây là hướng dẫn của chúng tôi!
                                                <Image src={item?.image}  className={cx("guide-img")} />
                                            </div>
                                        </div>
                                        
                                        : null
                                    } 
                                    {
                                        item?.action !== null ?
                                        <div className={cx("bot")}>
                                            <div className={cx("message")}>Hãy tham quan cửa hàng của chúng tôi {" "}
                                                <span 
                                                    style={{fontWeight: '600', color: '#a58838', cursor: 'pointer'}}
                                                    onClick={() => {router.push(`/${item.action}`)}}
                                                >tại đây</span>  {" "}
                                            nhé!</div>
                                        </div>
                                        
                                        : null
                                    }
                                    <div className={cx("bot")}>
                                        <div className={cx("message")}>Hãy chọn vấn đề bạn quan tâm nhé!
                                            <ul className={cx('chat-options')}>
                                                {
                                                    list_answer.map((item, index) => {
                                                        return (
                                                            <li className={cx('chat-item')} onClick={() => handleSelectQuestion(item)} key={index}>
                                                                {item.question_name}
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                 </div>
                            )
                        })
                        :
                        null
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
