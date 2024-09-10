import cx from 'classnames';
import { formatTicketStatusLabel } from '../../helpers/common';
import { TICKET_STATUS } from '../../constants/common';
import styles from './Ticket.module.scss';

const Ticket = ({
  ticket,
  index,
  onClick,
}: {
  ticket: Ticket;
  index: number;
  onClick: (ticket: Ticket) => void;
}) => {
  return (
    <div
      className={cx(styles.ticket, {
        [styles.todoTicket]: ticket.status === TICKET_STATUS.TODO,
        [styles.inProgressTicket]: ticket.status === TICKET_STATUS.IN_PROGRESS,
        [styles.doneTicket]: ticket.status === TICKET_STATUS.DONE,
      })}
      onClick={() => onClick(ticket)}
    >
      <p className={styles.title}>{ticket.title}</p>
      <p className={styles.description}>{ticket.description}</p>
      <div className={styles.footer}>
        <span
          className={styles.ticketNumber}
        >{`${formatTicketStatusLabel(ticket.status)} - ${index + 1}`}</span>
        <img className={styles.avatarImage} src={ticket.user.avatarUrl} />
      </div>
    </div>
  );
};

export default Ticket;
