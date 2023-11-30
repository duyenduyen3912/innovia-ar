import React, { useEffect, useRef, useState } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Object3D, TextureLoader } from 'three';
import * as THREE from "three";
const Model = ({ modelUrl, textureUrl }, ref) => {
    const modelRef = useRef<Object3D>();
    const gltf: GLTF = useLoader(GLTFLoader, modelUrl);
    const [scale, setScale] = useState(1);
    const handleWheelPreventDefault = (event) => {
      if (scale >= 0.5) {
        event.preventDefault();
      }
    };
    useEffect(() => {
      const textureLoader = new TextureLoader();
      const newTexture = textureLoader.load("https://thuvienlee.com/wp-content/uploads/2021/07/go-go-do-1.jpg");
      gltf.scene.traverse((node) => {
        if (!node.isMesh) return;
        if (node.material) {
          const newMaterial = new THREE.MeshBasicMaterial({ map: newTexture });
          newMaterial.color.copy(node.material.color);
          newMaterial.opacity = node.material.opacity;
          node.material = newMaterial;
        } else {
          node.material = new THREE.MeshBasicMaterial({ map: newTexture });
        }
      });
    }, [textureUrl]);
  
    const Mesh = () => {
        useFrame(() => {
            if (modelRef.current) {
                modelRef.current.position.set(5, 0, 5); 
                // modelRef.current.rotation.y += 0.005;
                modelRef.current.scale.set(10, 10, 10);
            }
            });
        return (
            <mesh ref={modelRef} scale={[10, 10, 10]}> 
                <primitive object={gltf.scene} onWheel={handleWheel}/> 
                {/* <meshStandardMaterial
                  attach="material"
                  color="gray"
                  roughness={0.5}
                  metalness={0.5}
                  shadowSide={THREE.DoubleSide}
                /> */}
            </mesh>);
    }
    const handleWheel = (event) => {
      const newScale = event.deltaY > 0 ? scale * 0.9 : scale * 1.1; 
      setScale(newScale);
    };
    return (
      <React.Fragment
        style={{ backgroundColor: "#a39468", width: "100%", height: "100vh" }}
        shadows
        dpr={[1, 2]}
        onWheel={handleWheelPreventDefault}
      >
        <color attach="background" args={["#202531"]} />
          <Mesh />
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.1, 0]}
          receiveShadow
        >
          
          <shadowMaterial attach="material" transparent opacity={0.3} />
        </mesh>
      </React.Fragment>
        
    );
};

export default React.forwardRef(Model);
