import { io, Socket } from "socket.io-client";
import { useAuthStore } from "~/stores/auth";

let socket: Socket | null = null;

export const useSocket = () => {
  const authStore = useAuthStore();

  const connect = () => {
    // Don't connect if already connected or no auth token.
    if (socket?.connected) return;
    if (!authStore.token) {
      console.warn("[socket.io] No auth token – skipping connection");
      return;
    }

    const baseUrl = useRuntimeConfig().public.apiBaseUrl as string;

    socket = io(baseUrl, {
      auth: { token: authStore.token },
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    socket.on("connect", () => {
      console.log("[socket.io] Connected:", socket?.id);
    });

    socket.on("connect_error", (err) => {
      console.error("[socket.io] Connection error:", err.message);
    });

    socket.on("disconnect", (reason) => {
      console.log("[socket.io] Disconnected:", reason);
    });
  };

  const disconnect = () => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  };

  const getSocket = (): Socket | null => socket;

  const onEvent = <T = unknown>(event: string, handler: (data: T) => void) => {
    socket?.on(event, handler as (...args: unknown[]) => void);
  };

  const offEvent = (event: string, handler?: (...args: unknown[]) => void) => {
    socket?.off(event, handler);
  };

  return { connect, disconnect, getSocket, onEvent, offEvent };
};
