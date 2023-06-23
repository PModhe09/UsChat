import { useCurrentRoom } from "../../../contexts/current-room.context";
import { memo } from "react";

const Top = () => {
   const name =  useCurrentRoom(v=>v.name);
  return (
    <div>
      top index
      {name}
    </div>
  )
}

export default memo(Top);
