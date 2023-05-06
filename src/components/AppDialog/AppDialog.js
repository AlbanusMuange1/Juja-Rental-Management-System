import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {ShowAppDialogContext} from "../contexts/contexts";
import {useContext} from "react";

export default function AlertDialog(props) {
  const { component, title } = props;

  // console.log({component})

  const { handleShowAppDialog, showAppDialog } = useContext(ShowAppDialogContext);

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={showAppDialog}
        onClose={() => handleShowAppDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* <RegisterBatchManufactureForm/> */}
            {component}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => handleShowAppDialog()}>
            Cancel
          </Button>
           <Button onClick={()=> {
               props.handleTextInput();
               handleShowAppDialog();
           }
           } autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
