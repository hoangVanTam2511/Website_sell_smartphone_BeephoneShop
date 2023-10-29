import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useEffect, useState } from "react";
import useCustomSnackbar from "../../../utilities/notistack";
import { Notistack } from "./enum";
const InputNumberAmount = ({ getAmount, cartItems, item }) => {

  const { handleOpenAlertVariant } = useCustomSnackbar();
  const [amount, setAmount] = useState(1);
  // const handleChangeAmount = (e) => {
  //   setAmount(e.target.value);
  // };

  const handleIncrement = () => {
    if (amount >= 4) {
      handleOpenAlertVariant("Số lượng đã đạt đến mức tối đa!", Notistack.ERROR);
    }
    else {
      setAmount((amount) => amount + 1);
    }
  }
  const handleReduce = () => {
    setAmount((amount) => amount - 1);
  }

  useEffect(() => {
    getAmount(amount);
  }, [amount])

  return (
    <>
      <div class="number-input2">
        <button
          disabled={amount == 1 ? true : false}
          onClick={() => {
            handleReduce();
          }}
          class="minus"
        >
          <div className="wrap-minus">
            <span>
              <RemoveOutlinedIcon style={{ fontSize: "20px" }} />
            </span>
          </div>
        </button>
        <input
          value={amount}
          min="1"
          // onChange={(e) => handleChangeAmount(e)}
          name="quantity"
          class="quantity"
          type="number"
        />
        <button
          class=""
          onClick={() => {
            handleIncrement();
          }}
        >
          <div className="wrap-plus">
            <span>
              <AddOutlinedIcon style={{ fontSize: "20px" }} />
            </span>
          </div>
        </button>
      </div>
    </>
  )

}
export default InputNumberAmount;
