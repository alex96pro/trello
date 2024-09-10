import { TICKET_STATUS } from '../common/constants/common';

export {};

declare global {
  type User = {
    id: string;
    name: string;
    avatarUrl: string;
  };

  type Ticket = {
    id: string;
    title: string;
    description: string;
    user: User;
    status: keyof typeof TICKET_STATUS;
  };
}
