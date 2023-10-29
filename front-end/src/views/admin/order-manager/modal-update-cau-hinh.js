import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Empty, Table } from "antd";
import { Box, FormControl, IconButton, Select, InputLabel, MenuItem, Pagination, TextField, Tooltip, FormControlLabel, Autocomplete, InputAdornment, OutlinedInput, Dialog, DialogContent, DialogTitle, DialogActions, Slide, ListItemText, Rating, } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { PlusOutlined } from "@ant-design/icons";
import Card from "../../../components/Card";
import { format } from "date-fns";
import axios from "axios";
import { parseInt } from "lodash";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import Zoom from '@mui/material/Zoom';
import * as dayjs from "dayjs";
import { AiOutlinePlus } from "react-icons/ai";
import LoadingIndicator from '../../../utilities/loading';
import useCustomSnackbar from '../../../utilities/notistack';
import { Notistack } from "./enum";
import { MdOutlineAddToPhotos } from "react-icons/md";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import Checkbox from '@mui/joy/Checkbox';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Done from '@mui/icons-material/Done';
import { Select as SelectJoy } from '@mui/joy';
import { Option as OptionJoy } from '@mui/joy';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export const ModalUpdateCauHinh = ({ open, onClose, ramByObject, romByObject, colorsByObject, rams, roms, colors }) => {
  const [ram, setRam] = useState(ramByObject);
  const [rom, setRom] = useState(romByObject);
  const [listColor, setListColor] = useState(colorsByObject);
  const { handleOpenAlertVariant } = useCustomSnackbar();


  useEffect(() => {
    setRam(ramByObject);
    setRom(romByObject);
  }, [ramByObject, romByObject]);

  return (
    <>
    </>
  )
}

