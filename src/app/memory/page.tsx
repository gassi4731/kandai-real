"use client";

import Link from "next/link";
import React, { useContext } from "react";
import { MemoryContext } from "../context/MemoryContext";
import FirebaseImage from "../component/FirebaseImage";

export default function MemoryPage() {
  const { memories } = useContext(MemoryContext);

  return (
    <div className="">
      <nav className="flex flex-col items-center py-10 fixed top-0 left-0 right-0 z-10">
        <h1>メモリー</h1>
      </nav>

      <div className="grid grid-cols-3 gap-3 pt-[100px] p-2">
        {memories.map((memory) => {
          return (
            <>
              <Link href={"/memory/" + memory.id}>
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden z-0">
                  <FirebaseImage src={memory.imageName} alt={""} width={500} height={100} />
                  <div className="absolute bottom-0 m-1">
                    <p className="text-base text-white">Day {memory.day}</p>
                    <p className="text-xs opacity-75">{memory.time}</p>
                  </div>
                </div>
              </Link>
            </>
          );
        })}
      </div>
    </div>
  );
}
