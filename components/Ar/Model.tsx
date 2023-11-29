import React, { useEffect, useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Object3D, TextureLoader } from 'three';
import * as THREE from "three";
const Model = ({ modelUrl, textureUrl }, ref) => {
    const modelRef = useRef<Object3D>();
    const gltf: GLTF = useLoader(GLTFLoader, modelUrl);
    useEffect(() => {
      const textureLoader = new TextureLoader();
      const newTexture = textureLoader.load(textureUrl);
  
      modelRef.current.traverse((child) => {
        if (child.isMesh) {
          const mesh = child as THREE.Mesh;
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((material) => {
              if ('map' in material) {
                material.map = newTexture;
              }
            });
          } else {
            if ('map' in mesh.material) {
              mesh.material.map = newTexture;
            }
          }
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
                <primitive object={gltf.scene} /> 
            </mesh>);
        }
    return (
      <React.Fragment
        style={{ backgroundColor: "#a39468", width: "100%", height: "100vh" }}
        shadows
        dpr={[1, 2]}
       
      >
        <color attach="background" args={["#faeee7"]} />
        <mesh   castShadow>
          <Mesh />
          <meshStandardMaterial
            attach="material"
            color="gray"
            roughness={0.5}
            metalness={0.5}
            shadowSide={THREE.DoubleSide}
          />
        </mesh>
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
