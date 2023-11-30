import React, { useRef, useState } from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
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
        require("../../assets/imgs/white.jpg"),
        require("../../assets/imgs/sofa.jpg"),
        require("../../assets/imgs/sofa2.jpg"),
        require("../../assets/imgs/go.jpg"),
        require("../../assets/imgs/go2.jpg"),
        require("../../assets/imgs/grey.png"),
    ]
    const onSelectTexture = (textureSelected) => {
        setTextureUrl(textureSelected)
    }
  return (
    <Modal title={name} visible={open} onOk={close} onCancel={close} className={cx('model-viewer')} >
      <Canvas 
        camera={{
        position: [0, 4, -2],
        near: 0.001,
        far: 200,
        }}
        className={cx('canvas')}
        style={{ width: '100%', height: '100%' }}
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
                <ArView modelUrl={modelUrl}/>
            </div>
            <div className={cx("texture")}>
                <div style={{textAlign: 'end', marginBottom:'10px'}}>Đổi màu sản phẩm tại đây</div>
                {
                    texture.map((item) => {
                        return (
                            <Image src={item.default.src} preview={false} className={cx("texture-img")} onClick={() => onSelectTexture(item)}/>
                        )
                    })
                }
            </div>
        </div>
    </Modal>
  );
}
