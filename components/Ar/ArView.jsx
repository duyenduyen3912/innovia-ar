import React, { useEffect } from 'react';

const ArView = ({ modelUrl, gltfModel }) => {
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('@google/model-viewer').then((modelViewerModule) => {
      }).catch(error => {
        console.error('Error importing @google/model-viewer:', error);
      });
    }
  }, []); 

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <model-viewer
        src={gltfModel}
        alt='model name'
        ar={true}
        loading='lazy'
        camera-controls={true}
        autoplay={true}
        style={{ width: '590px', height: '300px' }}
      ></model-viewer>
    </div>
  );
};

export default ArView;
