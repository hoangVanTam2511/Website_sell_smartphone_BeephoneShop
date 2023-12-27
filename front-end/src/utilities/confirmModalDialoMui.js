import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import { Button } from "antd";
import * as React from "react";

const Transition1 = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export function ConfirmDialog(props) {
  const { open, onClose, title, header, add } = props;

  const handleAdd = () => {
    add();
    onClose();
  };

  return (
    <div className="rounded-pill">
      <Dialog
        TransitionComponent={Transition1}
        open={open}
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description1"
        sx={{
          height: "350px",
          "& .MuiPaper-root": {
            borderRadius: "15px", // Giá trị border radius tùy chỉnh
            marginTop: "150px",
          },
        }}
      >
        <div className="p-2" style={{}}>
          <DialogTitle
            sx={{ color: "#09a129", fontWeight: "700", fontSize: "18px" }}
            id="alert-dialog-title"
          >
            {header}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{ color: "black" }}
              id="alert-dialog-description"
            >
              {title}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleAdd}
              className="rounded-2 me-2 button-mui"
              type="primary"
              style={{
                height: "40px",
                width: "auto",
                fontSize: "16px",
                marginBottom: "20px",
              }}
            >
              <span
                className="text-white"
                style={{ fontWeight: "500", marginBottom: "2px" }}
              >
                Xác nhận
              </span>
            </Button>
            <Button
              onClick={onClose}
              className="rounded-2 me-3 ant-btn-danger"
              type="primary"
              style={{
                height: "40px",
                width: "auto",
                fontSize: "16px",
                marginBottom: "20px",
              }}
            >
              <span
                className="text-white"
                style={{ fontWeight: "500", marginBottom: "2px" }}
              >
                Hủy bỏ
              </span>
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
