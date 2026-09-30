"use client";
import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "motion/react";

import { SocketContext, Message, ChatItem } from "@/contexts/socketio";
import { useToast } from "@/components/ui/use-toast";
import { Users, UsersRound, Hash, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

import { useChatScroll } from "./hooks/use-chat-scroll";
import { useTyping } from "./hooks/use-typing";
import { useSounds } from "./hooks/use-sounds";
import { useConnectionStatus } from "./hooks/use-connection-status";
import { ChatMessageList } from "./components/chat-message-list";
import { ChatInput } from "./components/chat-input";
import type { ProcessedCommand } from "./components/slash-command-menu";
import { UserList } from "./components/user-list";
import { EditProfileModal } from "./components/edit-profile-modal";
import { AdminPasswordDialog } from "./components/admin-password-dialog";
import { THEME } from "./constants";
import { getAvatarUrl } from "@/lib/avatar";

const OnlineUsers = () => {
  const {
    socket,
    users: _users,
    msgs,
    hasMoreMessages,
    loadingHistory,
    fetchOlderMessages,
    initStatus,
    fetchInitialMessages,
  } = useContext(SocketContext);
  const users = Array.from(_users.values());
  const [showUserList, setShowUserList] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [replyTarget, setReplyTarget] = useState<Message | null>(null);
  const [editTarget, setEditTarget] = useState<Message | null>(null);
  const [showAdminDialog, setShowAdminDialog] = useState(false);

  const currentUser = users.find((u) => u.socketId === socket?.id);
  const { toast } = useToast();
  const { playSendSound, playReceiveSound } = useSounds();
  const connectionStatus = useConnectionStatus(socket);
  const prevMsgsLength = useRef(msgs.length);

  // Driven by the server's "warning" event when msg-send is rate limited
  const [rateLimitedUntil, setRateLimitedUntil] = useState<number | null>(null);

  // Listen for server rate limit warnings and show the cooldown banner
  useEffect(() => {
    if (!socket) return;
    const onWarning = (data: { message: string }) => {
      if (data.message.includes("msg-send")) {
        setRateLimitedUntil(Date.now() + 10_000);
      }
    };
    socket.on("warning", onWarning);
    return () => {
      socket.off("warning", onWarning);
    };
  }, [socket]);

  // Play send/receive sounds for regular messages
  useEffect(() => {
    if (msgs.length > prevMsgsLength.current) {
      // Skip sounds when receiving initial message history (large batch on connect)
      const isSmallBatch = msgs.length - prevMsgsLength.current <= 2;
      const lastMsg = msgs[msgs.length - 1];
      const isSystem =
        lastMsg && "type" in lastMsg && lastMsg.type === "system";
      let isRecent = true;
      if (lastMsg?.createdAt) {
        const msgTime = new Date(lastMsg.createdAt).getTime();
        if (Date.now() - msgTime > 10000) isRecent = false;
      }

      if (isSmallBatch && isRecent && lastMsg && !isSystem) {
        if (lastMsg.username === currentUser?.name) playSendSound();
        else playReceiveSound();
      }
    }
    prevMsgsLength.current = msgs.length;
  }, [msgs, playSendSound, playReceiveSound, currentUser]);

  // Use custom hooks
  const {
    chatContainer,
    showScrollButton,
    unreads,
    scrollToBottom,
    isAtBottomRef,
  } = useChatScroll(
    isOpen,
    msgs.length,
    currentUser?.id,
    msgs[msgs.length - 1]?.sessionId,
    msgs[0]?.id ? String(msgs[0].id) : undefined,
  );

  const { typingUsers, handleTyping, getTypingText } = useTyping(
    socket,
    currentUser,
    scrollToBottom,
    isAtBottomRef,
  );

  const handleEditLastMessage = useCallback(() => {
    if (!currentUser) return;
    const fiveMinAgo = Date.now() - 5 * 60 * 1000;
    for (let i = msgs.length - 1; i >= 0; i--) {
      const item = msgs[i];
      if ("type" in item && item.type === "system") continue;
      const msg = item as Message;
      if (msg.sessionId !== currentUser.id) continue;
      if (new Date(msg.createdAt).getTime() < fiveMinAgo) break;
      setEditTarget(msg);
      return;
    }
  }, [msgs, currentUser]);

  const handleCommand = (cmd: ProcessedCommand) => {
    if (cmd.type === "admin") {
      setShowAdminDialog(true);
      return;
    }
    if (editTarget) {
      socket?.emit("msg-edit", { id: editTarget.id, content: cmd.content });
      setEditTarget(null);
      return;
    }

    socket?.emit("msg-send", {
      content: cmd.content,
      ...(replyTarget && { replyTo: replyTarget.id }),
    });
    setReplyTarget(null);
  };

  const updateProfile = ({
    name,
    avatar,
    color,
  }: {
    name: string;
    avatar: string;
    color?: string;
  }) => {
    socket?.emit("update-user", {
      username: name,
      avatar,
      color,
    });
    localStorage.setItem("username", name);
    localStorage.setItem("avatar", avatar);
    if (color) localStorage.setItem("color", color);
    const { dismiss } = toast({ title: "Profile updated" });
    setTimeout(dismiss, 3000);
  };

  // Feature 6: Keyboard shortcut Ctrl+/ to toggle chat
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => {
      if (prev) setShowUserList(false);
      else fetchInitialMessages();
      return !prev;
    });
  }, [fetchInitialMessages]);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "/") {
        e.preventDefault();
        toggleOpen();
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [toggleOpen]);

  const isSingleUser = users.length <= 1;

  return (
    <>
      <Popover
        open={isOpen}
        onOpenChange={(newOpen) => {
          // Prevent popover from closing while the profile modal is open (clicks outside)
          if (!newOpen && isEditingProfile) return;
          setIsOpen(newOpen);
          if (newOpen) fetchInitialMessages();
          if (!newOpen) setShowUserList(false);
        }}
      >
        <div className="flex items-center gap-2" data-no-custom-cursor="true">
          <motion.span
            key={users.length}
            initial={{ opacity: 0, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "hidden select-none whitespace-nowrap text-xs font-medium md:block",
              THEME.text.secondary,
            )}
          >
            {users.length} {users.length === 1 ? "person" : "people"} here
          </motion.span>

          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    type="button"
                    aria-label={`Open live presence and chat, ${users.length} ${users.length === 1 ? "person" : "people"} here`}
                    aria-expanded={isOpen}
                    className={cn(
                      "z-50 h-10 w-10 shrink-0 rounded-lg border p-0 shadow-sm backdrop-blur-sm transition-all duration-300 sm:h-11 sm:w-12",
                      "border-black/10 bg-background/40 hover:bg-background/80 dark:border-white/20 dark:bg-background/30",
                      !isOpen &&
                        unreads > 0 &&
                        "animate-pulse border-green-500/50",
                    )}
                  >
                    <div className="relative flex items-center justify-center w-full h-full">
                      <UsersRound className="size-5 sm:size-6" />

                      <span
                        className={cn(
                          "absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold leading-none text-white",
                        )}
                      >
                        {users.length}
                      </span>
                    </div>
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>
                  Chat <kbd className="ml-1 text-[10px] opacity-60">Ctrl+/</kbd>
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <PopoverContent
          className={cn(
            "w-80 min-h-[400px] sm:w-96 p-0 border-none shadow-2xl overflow-hidden rounded-xl mr-4 mb-4 flex flex-col",
            THEME.bg.primary,
            THEME.text.primary,
          )}
          side="top"
          data-no-custom-cursor="true"
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          {/* Header */}
          <div
            className={cn(
              "h-12 flex items-center justify-between px-4 shadow-sm border-b shrink-0",
              THEME.bg.secondary,
              THEME.border.primary,
            )}
          >
            <div
              className={cn(
                "flex items-center gap-2 font-semibold",
                THEME.text.header,
              )}
            >
              <Hash className={cn("w-5 h-5", THEME.text.secondary)} />
              <span>general</span>
              {/* Feature 2: Connection status indicator */}
              <div className="flex items-center gap-1.5">
                <div
                  className={cn(
                    "w-2 h-2 rounded-full",
                    connectionStatus === "connected" && "bg-green-500",
                    connectionStatus === "connecting" &&
                      "bg-yellow-500 animate-pulse",
                    connectionStatus === "disconnected" && "bg-red-500",
                  )}
                />
                {connectionStatus !== "connected" && (
                  <span
                    className={cn(
                      "text-[10px] font-normal",
                      THEME.text.secondary,
                    )}
                  >
                    {connectionStatus === "connecting"
                      ? "Connecting..."
                      : "Disconnected"}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {currentUser && (
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-9 w-9 p-0 gap-2 transition-colors rounded-full",
                    THEME.bg.hover,
                    THEME.text.secondary,
                    "hover:text-[#060607] dark:hover:text-white",
                  )}
                  onClick={() => setIsEditingProfile(true)}
                  title="Edit Profile"
                >
                  <div className="relative w-8 h-8">
                    <img
                      src={getAvatarUrl(currentUser.avatar)}
                      className="w-full h-full rounded-full ring-1 ring-black/10 dark:ring-white/10"
                      style={{
                        backgroundColor: currentUser.color || "#60a5fa",
                      }}
                    />
                    <div className="absolute -bottom-1 -right-1 bg-[#5865f2] rounded-full border-2 border-[var(--bg-primary)]">
                      <Settings className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </Button>
              )}

              <div className="w-[1px] h-4 bg-black/10 dark:bg-white/10 mx-0.5" />

              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "transition-colors gap-2",
                  THEME.bg.hover,
                  `hover:${THEME.text.header.replace("text-", "text-")} `,
                  "hover:text-[#060607] dark:hover:text-white",
                  showUserList && cn(THEME.text.header, THEME.bg.active),
                )}
                onClick={() => setShowUserList(!showUserList)}
              >
                <div className="flex items-center gap-1">
                  <div
                    className="w-2 h-2 bg-green-500 rounded-full"
                    aria-label="Online"
                    role="status"
                  />
                  <span>{users.length}</span>
                </div>
                <Users className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div
            className={cn("relative flex flex-col flex-1", THEME.bg.primary)}
          >
            <ChatMessageList
              msgs={msgs}
              users={users}
              currentUser={currentUser}
              chatContainerRef={chatContainer}
              showScrollButton={showScrollButton}
              unreads={unreads}
              scrollToBottom={scrollToBottom}
              isSingleUser={isSingleUser}
              typingUsers={typingUsers}
              getTypingText={getTypingText}
              onReply={setReplyTarget}
              onEdit={setEditTarget}
              hasMoreMessages={hasMoreMessages}
              loadingHistory={loadingHistory}
              onLoadMore={fetchOlderMessages}
              initStatus={initStatus}
            />

            <ChatInput
              onSendMessage={handleCommand}
              onTyping={handleTyping}
              placeholder="Message #general"
              replyTarget={replyTarget}
              onCancelReply={() => setReplyTarget(null)}
              editTarget={editTarget}
              onCancelEdit={() => setEditTarget(null)}
              onEditLastMessage={handleEditLastMessage}
              rateLimitedUntil={rateLimitedUntil}
            />

            <UserList
              users={users}
              socket={socket}
              showUserList={showUserList}
              onClose={() => setShowUserList(false)}
              onEditProfile={() => setIsEditingProfile(true)}
            />
          </div>
        </PopoverContent>
      </Popover>

      {currentUser && (
        <EditProfileModal
          user={currentUser}
          isOpen={isEditingProfile}
          onClose={() => setIsEditingProfile(false)}
          updateProfile={updateProfile}
        />
      )}

      <AdminPasswordDialog
        isOpen={showAdminDialog}
        onClose={() => setShowAdminDialog(false)}
        onSubmit={(password) => socket?.emit("admin-auth", { password })}
      />
    </>
  );
};

export default OnlineUsers;
