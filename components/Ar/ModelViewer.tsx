import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useLoader, useFrame, useThree } from '@react-three/fiber';
import classNames from 'classnames/bind'
import style from "./ModelViewer.module.scss"
import { OrbitControls } from '@react-three/drei';
import { CameraHelper } from 'three';
import { Image, Modal } from 'antd';
import Model from './Model';
import ArView from './ArView';



const cx = classNames.bind(style)
export default function ModelViewer({open, close, name, modelUrl}) {
    const modelRef = useRef();
    const [textureUrl, setTextureUrl] = useState("reset");
    const [gltfModel, setGltfModel] = useState();
    const texture = [
        "reset",
        require("../../assets/imgs/sofa3.jpg"),
        require("../../assets/imgs/sofa4.jpg"),
        require("../../assets/imgs/sofa5.jpg"),
        require("../../assets/imgs/sofa.jpg"),
        require("../../assets/imgs/go.jpg"),
        require("../../assets/imgs/go3.png"),
        require("../../assets/imgs/go4.png"),
        require("../../assets/imgs/go2.jpg"),   
        // "https://chippisoft.com/image/sofa3.jpg",
        // "https://chippisoft.com/image/sofa4.jpg",
        // "https://chippisoft.com/image/sofa5.jpg",
        // "https://chippisoft.com/image/sofa.jpg",
        // "https://chippisoft.com/image/go.jpg",
        // "https://chippisoft.com/image/go3.png",
        // "https://chippisoft.com/image/go4.png",
        // "https://chippisoft.com/image/go2.jpg",       
    ]
    const onSelectTexture = (textureSelected) => {
        if(textureSelected === "reset") setTextureUrl(textureSelected)
        else setTextureUrl(textureSelected.default.src)
    }
    console.log(modelUrl)
  return (
    <Modal title={name} visible={open} onOk={close} onCancel={close} className={cx('model-viewer')} >
        <div style={{margin: '20px 0'}}>
            <ArView modelUrl={modelUrl ? modelUrl : ''}  gltfModel={gltfModel}/>
        </div>
        <div className={cx("bottom")}>
            <Canvas 
                camera={{
                position: [0, 0, 5],
                near: 0.001,
                far: 200,
                }}
                className={cx('canvas')}
                id="canvas"
                style={{ width: '100%', height: '100%' }}
                pixelRatio={window.devicePixelRatio}
                gl={{forceResize: true, antialias: true, alpha: true}}
                >
            <ambientLight intensity={1.0} />
            <pointLight position={[0, 4, 6]} castShadow />
            <directionalLight intensity={1.0} position={[0, 0, 5]} />
            <OrbitControls  />
        
                <Model 
                    modelUrl={modelUrl} 
                    ref={modelRef} 
                    textureUrl={textureUrl}
                    modelPosition={[5, 0, 5]} 
                    cameraLookAt={[0, 0, 0]} 
                    setGltfModel={setGltfModel}
                />
            </Canvas>
            <div className={cx("texture")}>
                <div style={{textAlign: 'end', marginBottom:'10px'}}>Đổi màu sản phẩm tại đây</div>
                {
                    texture.map((item, index) => {
                        if(item === "reset") {
                            return (
                                <Image key={index} src={require("../../assets/imgs/reset.png").default.src} preview={false} className={cx("texture-img")} onClick={() => onSelectTexture(item)}/>
                            )
                        } else {
                            return (
                                <Image key={index} src={item.default.src} preview={false} className={cx("texture-img")} onClick={() => onSelectTexture(item)}/>
                            )
                        }
                        
                    })
                }
            </div>
        </div>
    </Modal>
  );
}