import { TICKET_STATUS } from '../constants/common';

export const formatTicketStatusLabel = (taskStatus: keyof typeof TICKET_STATUS) => {
  switch (taskStatus) {
    case 'DONE':
      return 'Done';
    case 'IN_PROGRESS':
      return 'In Progress';
    case 'TODO':
      return 'To Do';
    default:
      return '';
  }
};
