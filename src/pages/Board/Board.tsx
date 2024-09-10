import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useState } from 'react';
import { TICKET_STATUS } from '../../common/constants/common';
import { useAppStore } from '../../store/useAppStore';
import { formatTicketStatusLabel } from '../../common/helpers/common';
import TrelloLogo from '../../assets/images/trello-logo.png';
import Button from '../../common/components/Button/Button';
import TicketModal from '../../common/components/TicketModal/TicketModal';
import Ticket from '../../common/components/Ticket/Ticket';
import styles from './Board.module.scss';

const Board = () => {
  const [ticketModal, setTicketModal] = useState<{ show: boolean; ticket: Ticket | null }>({
    show: false,
    ticket: null,
  });

  const { tickets, users, updateTicket } = useAppStore((state) => ({
    tickets: state.tickets,
    users: state.users,
    updateTicket: state.updateTicket,
  }));

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const ticketForUpdate = tickets.find((ticket) => ticket.id === result.draggableId);
    updateTicket({ ...ticketForUpdate, status: result.destination.droppableId });
  };

  const getItemStyle = (draggableStyle: any) => ({
    ...draggableStyle,
    background: '#fff',
    cursor: 'pointer',
  });

  const onTicketClick = (ticket: Ticket) => {
    setTicketModal({ show: true, ticket });
  };

  return (
    <main className={styles.board}>
      <div className={styles.header}>
        <div className={styles.titleAndLogo}>
          <img className={styles.trelloLogo} src={TrelloLogo} alt="" />
          <h1 className={styles.title}>Trello Board</h1>
        </div>
        <Button onClick={() => setTicketModal({ show: true, ticket: null })} buttonType="primary">
          + Create Ticket
        </Button>
      </div>
      <div className={styles.boardInfo}>
        <div className={styles.tag}>{tickets.length} tickets</div>
        <div className={styles.tag}>{users.length} available users</div>
        <div className={styles.tag}>
          {Math.round(
            ((tickets.filter((ticket) => ticket.status === TICKET_STATUS.DONE).length || 1) /
              tickets.length) *
              100,
          )}
          {'% '}completion
        </div>
      </div>
      <div className={styles.columns}>
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.keys(TICKET_STATUS).map((ticketStatus) => {
            const ticketsToShow = tickets.filter((ticket) => ticket.status === ticketStatus);
            return (
              <Droppable key={ticketStatus} droppableId={ticketStatus}>
                {(provided) => (
                  <div
                    className={styles.column}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <h4 className={styles.columnHeader}>
                      {formatTicketStatusLabel(ticketStatus as keyof typeof TICKET_STATUS)}{' '}
                      <span className={styles.ticketsCount}>({ticketsToShow.length})</span>
                    </h4>
                    {ticketsToShow.length === 0 && (
                      <p className={styles.noTicketsLabel}>No tickets.</p>
                    )}
                    {ticketsToShow.map((ticket, index) => (
                      <Draggable key={ticket.id} draggableId={ticket.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(provided.draggableProps.style)}
                          >
                            <Ticket ticket={ticket} index={index} onClick={onTicketClick} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </DragDropContext>
      </div>
      <TicketModal
        ticket={ticketModal.ticket}
        show={ticketModal.show}
        onClose={() => setTicketModal({ show: false, ticket: null })}
      />
    </main>
  );
};

export default Board;
