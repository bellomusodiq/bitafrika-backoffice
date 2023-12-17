export interface ModalProps {
  children?: JSX.Element;
  headerLeft?: JSX.Element;
  headerCenter?: JSX.Element;
  openModal?: boolean;
  onClose: () => void;
  customStyles?: any;
}
