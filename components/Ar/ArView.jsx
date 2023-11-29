import React from 'react'
import '@google/model-viewer';
export default function ArView() {
  return (
    <div>
        <model-viewer
            src='https://chippisoft.com/models_product/shafa.glb'
            // ios-src={../Link/To/Model.usdz}
            alt='model name'
            ar={true}
            loading='lazy'
            camera-controls={true}
            // poster={../Link/To/Image.png}
            autoplay={true}>
        </model-viewer>
    </div>
  )
}
