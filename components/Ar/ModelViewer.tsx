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
    const [textureUrl, setTextureUrl] = useState();
    const texture = [
        "https://chippisoft.com/image/white.jpg",
        "https://chippisoft.com/image/grey.png",
        "https://chippisoft.com/image/sofa.jpg",
        "https://chippisoft.com/image/sofa2.jpg",
        "https://chippisoft.com/image/go.jpg",
        "https://chippisoft.com/image/go2.jpg",       
    ]
    const onSelectTexture = (textureSelected) => {
        setTextureUrl(textureSelected)
    }
    useEffect(() => {
        const canvas = document.getElementById("canvas")
        console.log(canvas)
        console.log(canvas)
    }, [])
  return (
    <Modal title={name} visible={open} onOk={close} onCancel={close} className={cx('model-viewer')} >
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
        gl={{ pixelRatio: window.devicePixelRatio, forceResize: true, antialias: true, alpha: true}}
        >
      <ambientLight intensity={1.0} />
      <pointLight position={[0, 4, 6]} castShadow />
      <directionalLight intensity={1.0} position={[0, 0, 5]} />
      <OrbitControls  />
      <mesh>
          <meshStandardMaterial />
        </mesh>
        <Model modelUrl={modelUrl} ref={modelRef} textureUrl={textureUrl}/>
    </Canvas>
        <div className={cx("bottom")}>
            <div>
                <div>Sử dụng tính năng AR tại dây</div>
                {window !== undefined && <ArView modelUrl={modelUrl} />}
            </div>
            <div className={cx("texture")}>
                <div style={{textAlign: 'end', marginBottom:'10px'}}>Đổi màu sản phẩm tại đây</div>
                {
                    texture.map((item) => {
                        return (
                            <Image src={item} preview={false} className={cx("texture-img")} onClick={() => onSelectTexture(item)}/>
                        )
                    })
                }
            </div>
        </div>
    </Modal>
  );
}
