"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Paperclip, Search } from "lucide-react";

interface Thread {
  id: string;
  title: string;
  lastMessage: string;
  time: string;
  unread: number;
}

interface Message {
  id: string;
  author: string;
  initials: string;
  text: string;
  time: string;
  isClient: boolean;
}

const threads: Thread[] = [
  {
    id: "1",
    title: "Pytanie o kolory",
    lastMessage: "Jasne, poprawione w v3. Logo jest teraz 20% większe.",
    time: "45 min",
    unread: 1,
  },
  {
    id: "2",
    title: "Logo v3 — finalna wersja",
    lastMessage: "Wysyłamy logo w trzech wariantach: dark, light i monochrom.",
    time: "2 godz.",
    unread: 1,
  },
  {
    id: "3",
    title: "Kick-off — notatki",
    lastMessage: "Notatki ze spotkania kickoff przesłane w załączniku.",
    time: "3 dni",
    unread: 0,
  },
  {
    id: "4",
    title: "Dostępy do hostingu",
    lastMessage: "Hasło do panelu hostingowego znajdziesz w Brand Vault.",
    time: "5 dni",
    unread: 0,
  },
];

const messagesData: Record<string, Message[]> = {
  "1": [
    {
      id: "m1",
      author: "Mateusz B.",
      initials: "MB",
      text: "Cześć! Chcieliśmy potwierdzić granatowy #1B3A6B jako kolor główny marki. Daje świetny kontrast z pomarańczowym akcentem. Co sądzicie?",
      time: "10:20",
      isClient: false,
    },
    {
      id: "m2",
      author: "Kuchciak Budownictwo",
      initials: "KB",
      text: "Tak, granatowy #1B3A6B świetnie pasuje do naszego brandu. Kojarzy się z solidnością i profesjonalizmem. Pomarańczowy jako akcent — idealne.",
      time: "11:45",
      isClient: true,
    },
    {
      id: "m3",
      author: "Mateusz B.",
      initials: "MB",
      text: "Super, dzięki za szybki feedback! Zaktualizowałem hero section — większy kontrast na CTA i powiększone logo.",
      time: "14:30",
      isClient: false,
    },
    {
      id: "m4",
      author: "Mateusz B.",
      initials: "MB",
      text: "Możecie zobaczyć efekt w Design Review — zostawiłem komentarz z linkiem do podglądu.",
      time: "14:31",
      isClient: false,
    },
    {
      id: "m5",
      author: "Kuchciak Budownictwo",
      initials: "KB",
      text: "Widziałem — dużo lepiej! Czy możemy jeszcze powiększyć logo w headerze?",
      time: "15:10",
      isClient: true,
    },
    {
      id: "m6",
      author: "Kuchciak Budownictwo",
      initials: "KB",
      text: "Chcielibyśmy żeby było bardziej widoczne na pierwszy rzut oka.",
      time: "15:11",
      isClient: true,
    },
    {
      id: "m7",
      author: "Mateusz B.",
      initials: "MB",
      text: "Jasne, poprawione w v3. Logo jest teraz 20% większe. Dajcie znać czy taki rozmiar jest okej — jeśli tak, zamykamy etap logo.",
      time: "15:50",
      isClient: false,
    },
  ],
};

export default function WiadomosciPage() {
  const [activeThread, setActiveThread] = useState("1");
  const [messageInput, setMessageInput] = useState("");
  const messages = messagesData[activeThread] ?? [];
  const activeThreadData = threads.find((t) => t.id === activeThread);

  return (
    // Precise negative margins to offset layout padding: pt-6 px-8 pb-10
    <div className="flex -mt-6 -mx-8 -mb-10 h-[calc(100vh-56px)]">

      {/* ── Thread list ── */}
      <div className="w-[280px] shrink-0 border-r border-[#EBEBEB] bg-white flex flex-col">

        {/* Search */}
        <div className="px-4 pt-4 pb-3 border-b border-[#EBEBEB]">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#CCCCCC]"
              strokeWidth={1.75}
            />
            <input
              type="text"
              placeholder="Szukaj..."
              className="w-full font-sans text-[13px] pl-9 pr-3 py-2 bg-[#F5F5F5] rounded-lg focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#EBEBEB] transition-all duration-150 placeholder:text-[#CCCCCC]"
            />
          </div>
        </div>

        {/* Threads */}
        <div className="flex-1 overflow-auto">
          {threads.map((thread) => {
            const isActive = activeThread === thread.id;
            return (
              <button
                key={thread.id}
                onClick={() => setActiveThread(thread.id)}
                className={`w-full text-left px-4 py-3.5 transition-colors duration-150 border-b border-[#F5F5F5] ${
                  isActive ? "bg-[#F0F0F0]" : "hover:bg-[#F7F7F7]"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className={`font-sans text-[13px] truncate ${
                        thread.unread > 0
                          ? "font-semibold text-[#111111]"
                          : "font-medium text-[#555555]"
                      }`}>
                        {thread.title}
                      </span>
                      <span className="font-sans text-[11px] text-[#AAAAAA] shrink-0 ml-2">
                        {thread.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-sans text-[12px] text-[#AAAAAA] truncate flex-1">
                        {thread.lastMessage}
                      </p>
                      {thread.unread > 0 && (
                        <span className="shrink-0 w-[18px] h-[18px] rounded-full bg-[#111111] text-white font-sans text-[10px] font-bold flex items-center justify-center">
                          {thread.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Chat area ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Thread header */}
        <div className="px-5 py-3 bg-white border-b border-[#EBEBEB] flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-full bg-[#111111] flex items-center justify-center shrink-0">
            <span className="font-sans text-[9px] font-bold text-white">MB</span>
          </div>
          <div>
            <p className="font-sans text-[14px] font-semibold text-[#111111]">
              {activeThreadData?.title}
            </p>
            <p className="font-sans text-[11px] text-[#AAAAAA]">
              Mateusz B. · make it studio
            </p>
          </div>
        </div>

        {/* Messages — #EBEBEB bg for contrast against white/black bubbles */}
        <div className="flex-1 overflow-auto bg-[#EBEBEB] px-5 py-5">
          <div className="max-w-[620px] mx-auto flex flex-col">

            {/* Date separator */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-[#DDDDDD]" />
              <span className="font-sans text-[11px] font-medium text-[#AAAAAA]">
                14 kwi 2026
              </span>
              <div className="flex-1 h-px bg-[#DDDDDD]" />
            </div>

            {messages.map((msg, i) => {
              const prev = messages[i - 1];
              const next = messages[i + 1];
              // First in a consecutive group — show avatar + name
              const isGroupStart = !prev || prev.isClient !== msg.isClient;
              // Last in a consecutive group — show timestamp
              const isGroupEnd = !next || next.isClient !== msg.isClient;
              // Gap before this message
              const topGap = isGroupStart && i > 0 ? "mt-4" : "mt-0.5";

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex gap-2.5 ${msg.isClient ? "flex-row-reverse" : ""} ${topGap}`}
                >
                  {/* Avatar — only on first in group, blank space otherwise */}
                  <div className="shrink-0 w-7 self-end mb-0.5">
                    {isGroupEnd && (
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                        msg.isClient
                          ? "bg-[#DDDDDD]"
                          : "bg-[#111111]"
                      }`}>
                        <span className={`font-sans text-[8px] font-bold ${
                          msg.isClient ? "text-[#555555]" : "text-white"
                        }`}>
                          {msg.initials}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Bubble + meta */}
                  <div className={`flex flex-col max-w-[440px] ${msg.isClient ? "items-end" : "items-start"}`}>
                    {isGroupStart && (
                      <span className="font-sans text-[11px] font-medium text-[#999999] mb-1 px-1">
                        {msg.author}
                      </span>
                    )}
                    <div className={`px-4 py-2.5 rounded-2xl ${
                      msg.isClient
                        ? "bg-[#111111] text-white rounded-br-sm"
                        : "bg-white text-[#111111] rounded-bl-sm shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
                    }`}>
                      <p className="font-sans text-[13.5px] leading-relaxed">
                        {msg.text}
                      </p>
                    </div>
                    {isGroupEnd && (
                      <span className="font-sans text-[10px] text-[#AAAAAA] mt-1 px-1">
                        {msg.time}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Input */}
        <div className="px-5 py-3.5 bg-white border-t border-[#EBEBEB]">
          <div className="max-w-[620px] mx-auto flex items-center gap-2">
            <button className="w-9 h-9 rounded-lg border border-[#EBEBEB] flex items-center justify-center text-[#AAAAAA] hover:text-[#555555] hover:border-[#CCCCCC] transition-all duration-150 shrink-0">
              <Paperclip size={15} strokeWidth={1.75} />
            </button>
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Napisz wiadomość..."
              className="flex-1 font-sans text-[14px] bg-[#F5F5F5] rounded-lg px-4 py-2.5 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#CCCCCC] transition-all duration-150 placeholder:text-[#CCCCCC]"
            />
            <button className="w-9 h-9 rounded-lg bg-[#111111] hover:bg-[#2a2a2a] flex items-center justify-center transition-colors duration-150 shrink-0">
              <Send size={14} strokeWidth={2} className="text-white translate-x-px" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
