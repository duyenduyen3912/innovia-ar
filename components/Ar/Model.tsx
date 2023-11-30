import React, { useEffect, useRef, useState } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Object3D, TextureLoader } from 'three';
import * as THREE from "three";
const Model = ({ modelUrl, textureUrl, modelPosition, cameraLookAt }, ref) => {
    const modelRef = useRef<Object3D>();
    const scaleRef = useRef(1);
    const gltf: GLTF = useLoader(GLTFLoader, modelUrl);
    const boundingBox = new THREE.Box3(); 
 
    useEffect(() => {
      const textureLoader = new TextureLoader();
      const newTexture = textureLoader.load(textureUrl);
      const darkerColor = new THREE.Color(0.2, 0.2, 0.2); // Điều chỉnh giá trị màu sắc tối hơn ở đây
      gltf.scene.traverse((node) => {
        if (!node.isMesh) return;

        if (node.material) {
          const newMaterial = new THREE.MeshBasicMaterial({
            map: newTexture,
            color: darkerColor, 
            emissive: darkerColor
          });
          newMaterial.opacity = node.material.opacity;
          node.material = newMaterial;
        } else {
          node.material = new THREE.MeshBasicMaterial({
            map: newTexture,
            color: darkerColor, 
            emissive: darkerColor
          });
        }
      });
    }, [textureUrl]);
    console.log("render")
    const Mesh = () => {
        useFrame(() => {
            if (modelRef.current) {
                modelRef.current.position.set(0, 0, 0); 
                modelRef.current.rotation.y += 0.005;
                modelRef.current.scale.set(1, 1, 1);  
            }
            });
        return (
            <mesh ref={modelRef} > 
                <primitive object={gltf.scene} /> 
            </mesh>);
    }
    
    return (
      <React.Fragment
        style={{ backgroundColor: "#a39468", width: "100%", height: "100vh" }}
        shadows
        dpr={[1, 2]}
      >
        <color attach="background" args={["#b4dbd3"]} />
          <Mesh />
          
          <perspectiveCamera position={modelPosition} lookAt={cameraLookAt} />
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