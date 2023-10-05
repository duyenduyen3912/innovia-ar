import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Resizer from 'react-image-file-resizer';

interface ImageGalleryProps {
  imageUrls: string[];
  maxWidth: number;
  maxHeight: number;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ imageUrls, maxWidth, maxHeight }) => {
  const [resizedImageUrls, setResizedImageUrls] = useState<string[]>([]);

  useEffect(() => {
    const resizeImages = async () => {
      const resizedImages = await Promise.all(
        imageUrls.map(async (imageUrl) => {
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          
          return new Promise<string>((resolve, reject) => {
            Resizer.imageFileResizer(
              blob,
              maxWidth,
              maxHeight,
              'JPEG',
              80,
              0,
              (resizedImage) => {
                resolve(resizedImage as string);
              },
              'base64'
            );
          });
        })
      );
      setResizedImageUrls(resizedImages);
    };

    resizeImages();
  }, [imageUrls, maxWidth, maxHeight]);

  return (
    <div>
      {resizedImageUrls.map((resizedImageUrl, index) => (
        <Image key={index} src={resizedImageUrl} alt={`Resized Image ${index}`} />
      ))}
    </div>
  );
};

export default ImageGallery;
