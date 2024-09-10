import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type AppState = {
  tickets: Ticket[];
  users: User[];
};

type AppActions = {
  setTickets: (ticket: any) => void;
  setUsers: (users: User[]) => void;
  createTicket: (ticket: any) => void;
  updateTicket: (ticket: any) => void;
  deleteTicket: (ticket: any) => void;
};

export const useAppStore = create<AppState & AppActions>()(
  persist(
    (set) => ({
      tickets: [],
      users: [],
      setTickets: (tickets: Ticket[]) => set((state) => ({ ...state, tickets })),
      setUsers: (users: User[]) => set((state) => ({ ...state, users })),
      createTicket: (ticket: Ticket) =>
        set((state) => ({ ...state, tickets: [...state.tickets, ticket] })),
      updateTicket: (updatedTicket: Ticket) =>
        set((state) => ({
          ...state,
          tickets: state.tickets.map((stateTicket) =>
            stateTicket.id === updatedTicket.id ? updatedTicket : stateTicket,
          ),
        })),
      deleteTicket: (deletedTicket: Ticket) =>
        set((state) => ({
          ...state,
          tickets: state.tickets.filter((stateTicket) => stateTicket.id !== deletedTicket.id),
        })),
    }),
    {
      name: 'trello-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
