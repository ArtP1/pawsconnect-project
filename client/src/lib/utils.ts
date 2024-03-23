import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { differenceInMinutes, differenceInHours, differenceInDays, differenceInWeeks, differenceInYears } from 'date-fns';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const compressImage = (imageDataUrl: string): Promise<string> => {
  const maxWidth = 250;
  const maxHeight = 250;
  const quality = 0.9;

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        if (blob) {
          const blobUrl = URL.createObjectURL(blob);
          resolve(blobUrl);
        } else {
          reject(new Error('Compression failed'));
        }
      }, 'image/jpeg', quality);
    };

    img.onerror = (error) => {
      reject(error);
    };

    img.src = imageDataUrl;
  });
};


// NPM packet source: https://www.npmjs.com/package/date-fns
// Developer page docs source: https://date-fns.org/docs/Getting-Started
export const formatMsgDate = (date: Date | string): string => {
  const now = new Date();
  const messageDate = new Date(date);

  const diffMinutes = differenceInMinutes(now, messageDate);
  const diffHours = differenceInHours(now, messageDate);
  const diffDays = differenceInDays(now, messageDate);
  const diffWeeks = differenceInWeeks(now, messageDate);
  const diffYears = differenceInYears(now, messageDate);

  if (diffMinutes < 1) {
    return 'now';
  } else if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else if (diffDays < 7) {
    return `${diffDays}d ago`;
  } else if (diffWeeks < 52) {
    return `${diffWeeks}w ago`;
  } else {
    return `${diffYears}y ago`;
  }
};