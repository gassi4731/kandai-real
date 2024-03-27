"use client";

import { createContext, useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

type Props = {
  children: React.ReactNode;
};

interface ContextInterface {
  memories: Memory[];
}

export const MemoryContext = createContext({} as ContextInterface);

export const MemoryProvider = ({ children }: Props) => {
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    const q = query(collection(db, "memories"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const snapshotMemories: Memory[] = [];
      querySnapshot.forEach((doc) => {
        const createdAt = doc.data().createdAt.toDate();
        const time = `${createdAt.getHours()}:${createdAt.getMinutes()}:${createdAt.getSeconds()}`;

        snapshotMemories.push({
          id: doc.id,
          day: createdAt.getDay(),
          time: time,
          createdAt: doc.data().createdAt,
          imageName: doc.data().imageName,
          reactions: doc.data().reaction,
        });
      });

      setMemories(snapshotMemories);
    });
  }, []);

  return <MemoryContext.Provider value={{ memories }}>{children}</MemoryContext.Provider>;
};
