import React from 'react'
import '@google/model-viewer';
export default function ArView({modelUrl}) {
  return (
    <div>
        <model-viewer
            src={modelUrl}
            alt='model name'
            ar={true}
            loading='lazy'
            camera-controls={true}
            autoplay={true}>
        </model-viewer>
    </div>
  )
}
