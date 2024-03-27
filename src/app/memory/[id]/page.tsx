"use client";

import FirebaseImage from "@/app/component/FirebaseImage";
import { MemoryContext } from "@/app/context/MemoryContext";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useContext, useEffect } from "react";
import { writeBatch, doc } from "firebase/firestore"; 
import { db } from "@/app/firebase";

export const runtime = 'edge'

export default function Memory({ params }: { params: { id: string } }) {
  const { memories } = useContext(MemoryContext);
  const [memory, setMemory] = useState<Memory | undefined>(undefined);
  // const batch = writeBatch(db);
  // const nycRef = doc(db, "cities");

  const reactions = [
    { id: 1, emoji: "👍" },
    { id: 2, emoji: "😮" },
    { id: 3, emoji: "😍" },
  ];

  const onClickReaction = (reactionId: number) => {
    console.log(reactionId);
  };

  useEffect(() => {
    setMemory(memories.find((memory) => memory.id === params.id));
  }, [memories, params.id]);

  const ReactionComponent = () => {
    return (
      <div className="flex justify-center gap-2 absolute bottom-0 z-10 mb-2 ml-2">
        {/* {reactions.map((reaction) => {
          return (
            <button
              key={reaction.id}
              className="rounded-full border-4 border-black bg-black/[.6] w-16 h-16 text-xl"
              onClick={() => onClickReaction(reaction.id)}
            >
              {reaction.emoji}
              <span className="text-sm ml-1">10</span>
            </button>
          );
        })} */}
      </div>
    );
  };

  if (!memory) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <nav className="flex flex-col items-center py-10 fixed top-0 left-0 right-0 z-10">
        <h1>メモリー Day{memory.day}</h1>
        <p className="text-sm">{memory.time}</p>
      </nav>

      <div className="rounded-2xl overflow-hidden mt-[140px] relative">
        <FirebaseImage src={memory.imageName} alt={""} width={1500} height={2000} />
        <ReactionComponent />
      </div>

      <div className="w-full flex justify-center mt-10">
        <Link href="/memory" className="flex gap-2">
          <Image src="/yajirushi.svg" alt="Back" width={25} height={25} className="scale-x-[-1]" />
          <span className="text-4xl font-bold">戻る</span>
        </Link>
      </div>
    </div>
  );
}
