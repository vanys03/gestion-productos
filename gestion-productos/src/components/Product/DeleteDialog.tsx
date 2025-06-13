import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

type Props = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

const DeleteDialog = ({ open, onCancel, onConfirm }: Props) => (
  <Dialog open={open} onClose={onCancel}>
    <DialogTitle>¿Eliminar producto?</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Esta acción no se puede deshacer. ¿Deseas eliminar este producto?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel}>Cancelar</Button>
      <Button onClick={onConfirm} color="error" variant="contained">
        Eliminar
      </Button>
    </DialogActions>
  </Dialog>
);

export default DeleteDialog;
