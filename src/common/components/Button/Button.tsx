import styles from './Button.module.scss';
import cx from 'classnames';

type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  children: React.ReactNode;
  buttonType?: 'primary' | 'secondary' | 'danger';
  className?: string;
};

const Button = ({ children, buttonType, className, ...restProps }: ButtonProps) => {
  return (
    <button
      className={cx(
        styles.button,
        {
          [styles.primaryButton]: buttonType === 'primary',
          [styles.secondaryButton]: buttonType === 'secondary',
          [styles.dangerButton]: buttonType === 'danger',
        },
        className,
      )}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;
