import { createContext, useContext, useEffect, useState } from "react";
import { transformToArrWithId } from "../misc/helpers";
import { database } from "../misc/firebase";

const RoomsContext=createContext();
export const RoomsProvider=({children})=>{
    const[rooms,setRooms]=useState(null);
    useEffect(()=>{
       const roomListRef=database.ref('rooms');
       roomListRef.on('value',(snap)=>{
        const data=transformToArrWithId(snap.val());
        console.log(data);
       })
       return()=>{
        roomListRef.off();
       }
    },[])
    return(
        <RoomsContext.Provider value="hello">
            {children}
        </RoomsContext.Provider>
    )
}

export const useRooms=()=>useContext(RoomsContext);