import { useAppStore } from '../../../store/useAppStore';
import { TICKET_STATUS } from '../../constants/common';
import { formatTicketStatusLabel } from '../../helpers/common';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CloseIcon, TrashIcon } from '../../../assets/icons';
import Button from '../Button/Button';
import styles from './TicketModal.module.scss';
import { useEffect } from 'react';

type TicketModalProps = {
  show: boolean;
  onClose: () => void;
  ticket?: Ticket | null;
};

type FormData = {
  title: string;
  description: string;
  status: keyof typeof TICKET_STATUS | string;
  user: string;
};

const TicketModal = ({ ticket, show, onClose }: TicketModalProps) => {
  const isAddTicketModal = !ticket;

  const { tickets, users, createTicket, updateTicket, deleteTicket } = useAppStore((state) => ({
    tickets: state.tickets,
    users: state.users,
    createTicket: state.createTicket,
    updateTicket: state.updateTicket,
    deleteTicket: state.deleteTicket,
  }));

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    values: {
      title: ticket?.title ?? '',
      description: ticket?.description ?? '',
      status: ticket?.status ?? '',
      user: ticket?.user.id ?? '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (isAddTicketModal) {
      createTicket({
        ...data,
        user: users.find((user) => user.id === data.user),
        id: `${tickets.length + 2}`, // mocked ids start from 1
      });
    } else {
      updateTicket({
        ...data,
        user: users.find((user) => user.id === data.user),
        id: ticket.id,
      });
    }
    toast.success(`Successfully ${isAddTicketModal ? 'created' : 'updated'} ticket.`, {
      autoClose: 3000,
    });
    onClose();
  };

  const onDeleteTicket = () => {
    deleteTicket(ticket);
    toast.success('Successfully deleted ticket.', {
      autoClose: 3000,
    });
    onClose();
  };

  useEffect(() => {
    if (!show) {
      reset();
    }
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <>
      <div onClick={onClose} className={styles.modalUnderlay}></div>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3 className={styles.title}>{isAddTicketModal ? 'Add New Ticket' : 'Update Ticket'}</h3>
          <button onClick={onClose} className={styles.closeButton}>
            <CloseIcon className={styles.closeIcon} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formField}>
            <label className={styles.formFieldLabel}>Title</label>
            <input
              placeholder="Add Title..."
              className={styles.input}
              {...register('title', {
                required: true,
                maxLength: 200,
                validate: {
                  notEmpty: (value) => value.trim() !== '',
                },
              })}
            />
            {errors.title?.type === 'required' && (
              <span className={styles.formError}>Title is required</span>
            )}
            {errors.title?.type === 'maxLength' && (
              <span className={styles.formError}>Maximum is 200 characters</span>
            )}
          </div>
          <div className={styles.formField}>
            <label className={styles.formFieldLabel}>Description</label>
            <textarea
              placeholder="Add Description..."
              className={styles.textarea}
              {...register('description', {
                required: true,
                maxLength: 1000,
                validate: {
                  notEmpty: (value) => value.trim() !== '',
                },
              })}
            />
            {errors.description?.type === 'required' && (
              <span className={styles.formError}>Description is required</span>
            )}
            {errors.description?.type === 'maxLength' && (
              <span className={styles.formError}>Maximum is 1000 characters</span>
            )}
          </div>
          <div className={styles.formField}>
            <label className={styles.formFieldLabel}>Status</label>
            <select className={styles.select} {...register('status', { required: true })}>
              <option hidden value="">
                Select Status...
              </option>
              {Object.keys(TICKET_STATUS).map((ticketStatus) => (
                <option value={ticketStatus} key={ticketStatus}>
                  {formatTicketStatusLabel(ticketStatus as keyof typeof TICKET_STATUS)}
                </option>
              ))}
            </select>
            {errors.status && <span className={styles.formError}>Status is required</span>}
          </div>
          <div className={styles.formField}>
            <label className={styles.formFieldLabel}>User</label>
            <select className={styles.select} {...register('user', { required: true })}>
              <option hidden value="">
                Select User...
              </option>
              {users.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {errors.user && <span className={styles.formError}>User is required</span>}
          </div>
          <div className={styles.buttons}>
            {!isAddTicketModal && (
              <Button
                type="button"
                className={styles.deleteButton}
                onClick={onDeleteTicket}
                buttonType="danger"
              >
                <TrashIcon className={styles.trashIcon} />
                Delete
              </Button>
            )}
            <Button onClick={onClose} type="button" buttonType="secondary">
              Cancel
            </Button>
            <Button type="submit" buttonType="primary">
              Confirm
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TicketModal;
