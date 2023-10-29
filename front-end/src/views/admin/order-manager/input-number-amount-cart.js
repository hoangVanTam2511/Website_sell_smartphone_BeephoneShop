import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useEffect, useState } from "react";
import { parseInt } from "lodash";
import { Notistack } from "./enum";
import useCustomSnackbar from "../../../utilities/notistack";
const InputNumberAmountCart = ({ id, update, amountCurrent }) => {

  const { handleOpenAlertVariant } = useCustomSnackbar();
  const [amount, setAmount] = useState(amountCurrent);

  const handleIncrement = () => {
    if (amount >= 4) {
      handleOpenAlertVariant("Số lượng đã đạt đến mức tối đa!", Notistack.ERROR);
    }
    else {
      setAmount((amount) => amount + 1);
      update(id, amount + 1);
    }
  }
  const handleReduce = () => {
    setAmount((amount) => amount - 1);
    update(id, amount - 1);
  }

  useEffect(() => {
    setAmount(amountCurrent);
  }, [amountCurrent]);

  return (
    <>
      <div class="number-input1 ">
        <button onClick={() => handleReduce()}
          disabled={amount === 1 ? true : false}
          class="minus">
          <div className='wrap-minus'>
            <span>
              <RemoveOutlinedIcon style={{ fontSize: "18px" }} />
            </span>
          </div>
        </button>
        <input value={amount} readOnly
          name="quantity" class="quantity"
          type="number" />
        <button class="" onClick={() => handleIncrement()}>
          <div className='wrap-plus'>
            <span >
              <AddOutlinedIcon style={{ fontSize: "18px" }} />
            </span>
          </div>
        </button>
      </div>
    </>

  )

}
export default InputNumberAmountCart;
