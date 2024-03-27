"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import { Camera, CameraType } from "react-camera-pro";
import { ref, uploadBytes } from "firebase/storage";
import { db, storage } from "./firebase";
import { ulid } from "ulid";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";

export default function Home() {
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const [image, setImage] = useState<string | null>(null);
  const [showImage, setShowImage] = useState<boolean>(false);
  const camera = useRef<CameraType>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [activeDeviceId, setActiveDeviceId] = useState<string | undefined>(undefined);
  const [state, setState] = useState(0);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter((i) => i.kind == "videoinput");
      setDevices(videoDevices);
    })();
  });

  const onClickCameraButton = () => {
    setState(1);
    if (camera.current) {
      const photo = camera.current.takePhoto();
      setImage(photo);
      setShowImage(true);
    }
  };

  const onClickCencelButton = () => {
    setState(0);
    setImage(null);
    setShowImage(false);
  };

  const onClickSendButton = async () => {
    if (image === null) {
      return;
    }
    const generatedULID = ulid();
    const fileName = generatedULID + ".jpg";
    // =======
    // 画像データの変換
    // data: URLスキーム部分を除去して純粋なBase64文字列のみを取得
    const pureBase64String = image.split(",")[1];

    // Base64文字列をデコードしてバイナリデータに変換
    const byteCharacters = atob(pureBase64String);

    // バイナリデータを配列に変換
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    // Uint8Arrayを使用してバイナリデータの配列を生成
    const byteArray = new Uint8Array(byteNumbers);

    // Blobオブジェクトを生成
    const blob = new Blob([byteArray], { type: "image/jpeg" });

    // =======
    // アップロードデータ
    const data = {
      createdAt: new Date(),
      imageName: fileName,
      reactions: { 1: 0, 2: 0, 3: 0 },
    };

    const storageRef = ref(storage, fileName);
    uploadBytes(storageRef, blob).then(() => {
      alert("写真のアップロードが完了しました！");
      router.push("/memory");
    });
    await setDoc(doc(db, "memories", generatedULID), data);
  };

  const ButtonComponent = useMemo(() => {
    if (state === 0) {
      return (
        <div className="flex justify-center pt-4">
          <button className="rounded-full border-8 border-white w-24 h-24" onClick={onClickCameraButton}></button>
        </div>
      );
    } else {
      return (
        <div className="w-full flex justify-center mt-10">
          <button className="flex gap-2 items-center" onClick={onClickSendButton}>
            <span className="text-4xl font-bold">追加</span>
            <Image src="/yajirushi.svg" alt="Back" width={25} height={25} />
          </button>
        </div>
      );
    }
  }, [state]);

  return (
    <>
      <nav className="flex flex-col items-center py-10">
        <h1>KandaiReal.</h1>
      </nav>
      <div className="rounded-2xl overflow-hidden relative">
        {showImage ? (
          <button
            onClick={onClickCencelButton}
            className="absolute top-0 right-0 mt-2 mr-2 z-10 text-4xl w-10 h-10 bg-black/[.6] rounded-full"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        ) : null}
        {!showImage ? (
          <Camera
            ref={camera}
            aspectRatio={3 / 4}
            numberOfCamerasCallback={(i) => setNumberOfCameras(i)}
            videoSourceDeviceId={activeDeviceId}
            errorMessages={{
              noCameraAccessible: "No camera device accessible. Please connect your camera or try a different browser.",
              permissionDenied: "Permission denied. Please refresh and give camera permission.",
              switchCamera:
                "It is not possible to switch camera to different one because there is only one video device accessible.",
              canvas: "Canvas is not supported.",
            }}
            videoReadyCallback={() => {
              console.log("Video feed ready.");
            }}
          />
        ) : (
          <Image src={image ?? ""} alt="" width={1200} height={1000} className="scale-x-[-1]" />
        )}
      </div>
      {ButtonComponent}
    </>
  );
}
