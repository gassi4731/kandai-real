import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function FirebaseImage({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  const [url, setUrl] = useState("");
  const storage = getStorage();
  const starsRef = ref(storage, src);

  useEffect(() => {
    getDownloadURL(starsRef)
      .then((url) => {
        setUrl(url);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!url) {
    return <div></div>;
  }

  return <Image src={url} alt={alt} width={width} height={height} />;
}
