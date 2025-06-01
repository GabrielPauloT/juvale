export type ModalProps = {
  open: boolean;
  onClose: () => void;
  infos: {
    Id: string;
    Nome: string;
    Compania: string;
    Ocupacao: string;
    VR: number | string;
    VA: number | string;
  };
  action: string;
};
