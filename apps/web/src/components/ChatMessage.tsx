import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Globe } from "lucide-react";
import { convertRemToPixels } from "@/lib/utils";

export function ChatAnswer({
  children: message,
  sources,
  loading = false,
}: {
  children: string;
  sources?: string[];
  loading?: boolean;
}) {
  return (
    <div className="flex w-full flex-col items-start gap-5">
      {loading ? (
        <MessageSkeleton />
      ) : (
        <div className="w-full text-lg text-white/60">{message}</div>
      )}
      {sources && sources?.length > 0 && (
        <>
          <h1 className="animate-fade-in text-md flex items-center justify-center gap-1 opacity-0 [animation-duration:1s]">
            <ArrowUpRight className="h-5 w-5" />
            Sources
          </h1>
          <div className="animate-fade-in -mt-3 flex items-center justify-start opacity-0 [animation-duration:1s]">
            {sources?.map((source) => (
              <a
                className="bg-rgray-3 flex items-center justify-center gap-2 rounded-full py-1 pl-2 pr-3 text-sm"
                key={source}
                href={source}
              >
                <Globe className="h-4 w-4" />
                {source}
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function ChatQuestion({ children }: { children: string }) {
  return (
    <div
      className={`text-rgray-12 w-full text-left ${children.length > 200 ? "text-xl" : "text-2xl"}`}
    >
      {children}
    </div>
  );
}

export function ChatMessage({
  children,
  isLast = false,
  index,
}: {
  children: React.ReactNode | React.ReactNode[];
  isLast?: boolean;
  index: number;
}) {
  const messageRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLast) return;
    console.log(
      "last",
      messageRef.current?.offsetTop,
      messageRef.current?.parentElement,
    );
    messageRef.current?.parentElement?.scrollTo({
      top: messageRef.current?.offsetTop,
      behavior: "smooth",
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "tween",
        duration: 0.5,
      }}
      ref={messageRef}
      className={`${index === 0 ? "pt-16" : "pt-28"} flex w-full flex-col items-start justify-start gap-5 transition-[height] ${isLast ? "min-h-screen" : "h-auto"}`}
    >
      {children}
    </motion.div>
  );
}

function MessageSkeleton() {
  return (
    <div className="animate-fade-in flex w-full flex-col items-start gap-3 opacity-0 [animation-delay:0.5s] [animation-duration:1s]">
      <div className="bg-rgray-5 h-6 w-full animate-pulse rounded-md text-lg"></div>
      <div className="bg-rgray-5 h-6 w-full animate-pulse rounded-md text-lg"></div>
      <div className="bg-rgray-5 h-6 w-full animate-pulse rounded-md text-lg"></div>
      <div className="bg-rgray-5 h-6 w-full animate-pulse rounded-md text-lg"></div>
      <div className="bg-rgray-5 h-6 w-[70%] animate-pulse rounded-md text-lg"></div>
    </div>
  );
}
