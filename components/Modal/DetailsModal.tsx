import { Modal as AntdModal } from "antd";
import styles from "./DetailsModal.module.css";

interface IProps {
  open: boolean;
  children: React.ReactNode;
  title?: React.ReactNode | string;
  onClose?: (event: any) => void;
  width?: number | string;
}

const Modal = ({ open, title, children, width, onClose }: IProps) => {
  return (
    <AntdModal
      open={open}
      footer={false}
      width={width || "598px"}
      closable={false}
      classNames={{
        header: styles.header,
        content: styles.content,
      }}
      title={
        title ? (
          <div className={styles.title}>
            {title}
            <div
              style={{
                cursor: "pointer",
              }}
              onClick={onClose}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 1L1 13M1 1L13 13"
                  stroke="#667085"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        ) : null
      }
    >
      {children}
    </AntdModal>
  );
};

export default Modal;
