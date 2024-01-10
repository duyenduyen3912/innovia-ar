import React, { useEffect, useRef, useState } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';

const Model = ({ modelUrl, textureUrl, modelPosition, cameraLookAt, setGltfModel }, ref) => {
  const modelRef = useRef();
  const gltf = useLoader(GLTFLoader, modelUrl);

  const originalMaterialRef = useRef(null);
  const [resetTexture, setResetTexture] = useState(false);

  useEffect(() => {
    const loadTextures = async () => {
      const textureLoader = new THREE.TextureLoader();

      // Load all textures asynchronously
      const originalTexture = textureUrl === "reset" && resetTexture === true ? originalMaterialRef.current.map : await textureLoader.loadAsync(textureUrl);

      // Update materials after all textures are loaded
      console.log(originalTexture);
      gltf.scene.traverse((node) => {
        if (node.isMesh) {
          const mesh = node;
          const originalMaterial = mesh.material;

          const newTexture = originalTexture !== null ? originalTexture : originalMaterial.map;
          const darkerColor = new THREE.Color(0.5, 0.5, 0.5);
          const newMaterial = new THREE.MeshBasicMaterial({
            map: newTexture,
            color: darkerColor,
            side: originalMaterial.side,
          });

          mesh.material = newMaterial;
        }
      });

      // Export the model once textures are loaded
      const exporter = new GLTFExporter();
      exporter.parse(gltf.scene, (gltfData) => {
        const data = JSON.stringify(gltfData);
        const blob = new Blob([data], { type: 'application/json' });

        // Create a URL for the Blob and pass it to model-viewer
        const blobUrl = URL.createObjectURL(blob);
        setGltfModel(blobUrl);
        console.log(blobUrl);
      }, { binary: true });
    };

    loadTextures();
  }, [textureUrl, gltf, setGltfModel]);

  useEffect(() => {
    if (resetTexture === false) {
      gltf.scene.traverse((node) => {
        if (node.isMesh) {
          const mesh = node;
          const originalMaterial = mesh.material;
          if (originalMaterial) {
            originalMaterialRef.current = originalMaterial.clone();
            console.log("lưu texture");
          }
        }
      });
      setResetTexture(true);
    }
    const exporter = new GLTFExporter();
    exporter.parse(gltf.scene, (gltfData) => {
      const data = JSON.stringify(gltfData);
      const blob = new Blob([data], { type: 'application/json' });

      // Create a URL for the Blob and pass it to model-viewer
      const blobUrl = URL.createObjectURL(blob);
      setGltfModel(blobUrl);
    }, { binary: true });
  }, []);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.position.set(0, 0, 0);
      modelRef.current.scale.set(1, 1, 1);
    }
  });

  const Mesh = () => {
    return (
      <mesh ref={modelRef}>
        <primitive object={gltf.scene} />
      </mesh>
    );
  };

  return (
    <>
      <color attach="background" args={['#f2ebd8']} />
      <Mesh />
      <perspectiveCamera position={modelPosition} lookAt={cameraLookAt} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <shadowMaterial attach="material" transparent opacity={0.3} />
      </mesh>
    </>
  );
};

export default React.forwardRef(Model);
