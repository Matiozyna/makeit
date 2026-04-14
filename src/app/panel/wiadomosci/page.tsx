"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Paperclip, Search } from "lucide-react";

interface Thread {
  id: string;
  title: string;
  lastMessage: string;
  author: string;
  time: string;
  unread: boolean;
  avatar: { initials: string; gradient: string };
}

interface Message {
  id: string;
  author: string;
  initials: string;
  gradient: string;
  text: string;
  time: string;
  isClient: boolean;
}

const threads: Thread[] = [
  {
    id: "1",
    title: "Pytanie o kolory",
    lastMessage: "Jasne, poprawione w v3. Logo jest teraz 20% większe.",
    author: "Mateusz B.",
    time: "45 min",
    unread: true,
    avatar: { initials: "MB", gradient: "from-[#6B4EFF] to-[#4EA8FF]" },
  },
  {
    id: "2",
    title: "Logo v3 — finalna wersja",
    lastMessage: "Wysyłamy logo w trzech wariantach: dark, light i monochrom.",
    author: "Mateusz B.",
    time: "2 godz.",
    unread: true,
    avatar: { initials: "MB", gradient: "from-[#6B4EFF] to-[#4EA8FF]" },
  },
  {
    id: "3",
    title: "Kick-off — notatki",
    lastMessage: "Notatki ze spotkania kickoff przesłane w załączniku.",
    author: "Mateusz B.",
    time: "3 dni",
    unread: false,
    avatar: { initials: "MB", gradient: "from-[#6B4EFF] to-[#4EA8FF]" },
  },
  {
    id: "4",
    title: "Dostępy do hostingu",
    lastMessage: "Hasło do panelu hostingowego znajdziesz w Brand Vault.",
    author: "Mateusz B.",
    time: "5 dni",
    unread: false,
    avatar: { initials: "MB", gradient: "from-[#6B4EFF] to-[#4EA8FF]" },
  },
];

const messagesData: Record<string, Message[]> = {
  "1": [
    {
      id: "m1",
      author: "Mateusz B.",
      initials: "MB",
      gradient: "from-[#6B4EFF] to-[#4EA8FF]",
      text: "Cześć! Chcieliśmy potwierdzić granatowy #1B3A6B jako kolor główny marki. Daje świetny kontrast z pomarańczowym akcentem. Co sądzicie?",
      time: "14 kwi, 10:20",
      isClient: false,
    },
    {
      id: "m2",
      author: "Kuchciak Budownictwo",
      initials: "KB",
      gradient: "from-[#4EA8FF] to-[#6B4EFF]",
      text: "Tak, granatowy #1B3A6B świetnie pasuje do naszego brandu. Kojarzy się z solidnością i profesjonalizmem. Pomarańczowy jako akcent — idealne.",
      time: "14 kwi, 11:45",
      isClient: true,
    },
    {
      id: "m3",
      author: "Mateusz B.",
      initials: "MB",
      gradient: "from-[#6B4EFF] to-[#4EA8FF]",
      text: "Super, dzięki za szybki feedback! Zaktualizowałem hero section — większy kontrast na CTA i powiększone logo. Możecie zobaczyć efekt w Design Review.",
      time: "14 kwi, 14:30",
      isClient: false,
    },
    {
      id: "m4",
      author: "Kuchciak Budownictwo",
      initials: "KB",
      gradient: "from-[#4EA8FF] to-[#6B4EFF]",
      text: "Widziałem — dużo lepiej! Czy możemy jeszcze powiększyć logo w headerze? Chcielibyśmy żeby było bardziej widoczne na pierwszy rzut oka.",
      time: "14 kwi, 15:10",
      isClient: true,
    },
    {
      id: "m5",
      author: "Mateusz B.",
      initials: "MB",
      gradient: "from-[#6B4EFF] to-[#4EA8FF]",
      text: "Jasne, poprawione w v3. Logo jest teraz 20% większe. Dajcie znać czy taki rozmiar jest okej — jeśli tak, zamykamy etap logo.",
      time: "14 kwi, 15:50",
      isClient: false,
    },
  ],
};

export default function WiadomosciPage() {
  const [activeThread, setActiveThread] = useState("1");
  const [messageInput, setMessageInput] = useState("");
  const messages = messagesData[activeThread] || [];

  return (
    <div className="flex h-[calc(100vh-60px-64px)] gap-0 -m-8">
      {/* Thread list */}
      <div className="w-[320px] shrink-0 border-r border-[#E5E7EB] bg-white flex flex-col">
        {/* Search */}
        <div className="p-4 border-b border-[#E5E7EB]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF]" strokeWidth={2} />
            <input
              type="text"
              placeholder="Szukaj wątku..."
              className="w-full font-sans text-[13px] pl-9 pr-4 py-2.5 bg-[#F5F7FA] border border-transparent focus:border-[#E5E7EB] focus:bg-white rounded-xl focus:outline-none transition-all duration-200 placeholder:text-[#BBBBBB]"
            />
          </div>
        </div>

        {/* Threads */}
        <div className="flex-1 overflow-auto">
          {threads.map((thread) => (
            <button
              key={thread.id}
              onClick={() => setActiveThread(thread.id)}
              className={`w-full text-left px-4 py-4 border-b border-[#F0F2F5] transition-all duration-200 ${
                activeThread === thread.id
                  ? "bg-gradient-to-r from-[#F0F7FF] to-[#F5F0FF] border-l-[3px] border-l-[#4EA8FF]"
                  : "hover:bg-[#FAFBFC] border-l-[3px] border-l-transparent"
              }`}
            >
              <div className="flex gap-3">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${thread.avatar.gradient} flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(78,168,255,0.2)]`}>
                  <span className="font-sans text-[10px] font-semibold text-white">{thread.avatar.initials}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`font-sans text-[13px] truncate ${thread.unread ? "font-semibold text-[#111111]" : "font-medium text-[#111111]"}`}>
                      {thread.title}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="font-sans text-[11px] text-[#9CA3AF]">{thread.time}</span>
                      {thread.unread && (
                        <span className="w-2 h-2 rounded-full bg-[#4EA8FF]" />
                      )}
                    </div>
                  </div>
                  <p className={`font-sans text-[12px] truncate mt-0.5 ${thread.unread ? "text-[#6B7280]" : "text-[#9CA3AF]"}`}>
                    {thread.lastMessage}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Active thread */}
      <div className="flex-1 flex flex-col bg-[#FAFBFC] min-w-0">
        {/* Thread header */}
        <div className="px-6 py-4 bg-white border-b border-[#E5E7EB] flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6B4EFF] to-[#4EA8FF] flex items-center justify-center shadow-[0_2px_8px_rgba(78,168,255,0.2)]">
            <span className="font-sans text-[10px] font-semibold text-white">MB</span>
          </div>
          <div>
            <p className="font-sans text-[14px] font-medium text-[#111111]">
              {threads.find((t) => t.id === activeThread)?.title}
            </p>
            <p className="font-sans text-[11px] text-[#9CA3AF]">Mateusz B. · make it</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-auto px-6 py-6">
          <div className="max-w-[720px] mx-auto flex flex-col gap-5">
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex gap-3 ${msg.isClient ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${msg.gradient} flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(78,168,255,0.15)]`}>
                    <span className="font-sans text-[9px] font-semibold text-white">{msg.initials}</span>
                  </div>
                  <div className={`max-w-[480px] ${msg.isClient ? "items-end" : "items-start"} flex flex-col`}>
                    <div className={`rounded-[18px] px-4.5 py-3 ${
                      msg.isClient
                        ? "bg-gradient-to-br from-[#4EA8FF] to-[#6B4EFF] text-white shadow-[0_4px_16px_rgba(78,168,255,0.25)]"
                        : "bg-white border border-[#E5E7EB] text-[#111111] shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                    }`}>
                      <p className={`font-sans text-[13.5px] leading-relaxed ${msg.isClient ? "text-white/95" : ""}`}>
                        {msg.text}
                      </p>
                    </div>
                    <span className={`font-sans text-[11px] text-[#9CA3AF] mt-1.5 px-1 ${msg.isClient ? "text-right" : ""}`}>
                      {msg.author} · {msg.time}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6B4EFF] to-[#4EA8FF] flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(78,168,255,0.15)]">
                <span className="font-sans text-[9px] font-semibold text-white">MB</span>
              </div>
              <div className="bg-white border border-[#E5E7EB] rounded-[18px] px-4 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <div className="flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9CA3AF] animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9CA3AF] animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9CA3AF] animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
              <span className="font-sans text-[11px] text-[#9CA3AF]">Mateusz pisze...</span>
            </motion.div>
          </div>
        </div>

        {/* Input */}
        <div className="px-6 py-4 bg-white border-t border-[#E5E7EB]">
          <div className="max-w-[720px] mx-auto flex gap-2">
            <button className="w-10 h-10 rounded-xl border border-[#E5E7EB] flex items-center justify-center text-[#9CA3AF] hover:text-[#6B7280] hover:border-[#D0D4DB] transition-all duration-200 shrink-0">
              <Paperclip className="w-4 h-4" strokeWidth={1.75} />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Napisz wiadomość..."
                className="w-full font-sans text-[14px] border border-[#E5E7EB] rounded-xl px-4 py-2.5 pr-12 focus:outline-none focus:border-[#111111] focus:shadow-[0_0_0_3px_rgba(17,17,17,0.06)] transition-all duration-200 placeholder:text-[#BBBBBB]"
              />
            </div>
            <button className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4EA8FF] to-[#6B4EFF] flex items-center justify-center hover:shadow-[0_4px_16px_rgba(78,168,255,0.35)] hover:-translate-y-0.5 transition-all duration-200 shrink-0">
              <Send className="w-4 h-4 text-white" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
