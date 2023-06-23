import React from 'react'
import {Loader} from 'rsuite'
import { useParams } from 'react-router';
import { useRooms  } from '../../contexts/rooms.context';
import ChatTop from '../../components/chat-window/top/index';
import ChatBottom from '../../components/chat-window/bottom/index';
import Messages from '../../components/chat-window/messages/index';
import { CurrentRoomProvider } from '../../contexts/current-room.context';

const Chat = () => {

    const {chatId}=useParams();
    const rooms=useRooms();

    if(!rooms){
        return(
            <Loader center vertical size="md" content="Loading" speed="slow"/>
        )
    }

    const currentRoom=rooms.find(room=>room.id===chatId);
    if(!currentRoom){
        return(
            <h6 className='text-center mt-page'>Chat with id:{chatId} id not found</h6>
        )
    }

    const {name,description}=currentRoom;

    const currentRoomData={
        name,description
    }
  return (
      <CurrentRoomProvider data={currentRoomData}>
      <div className='chat-top'><ChatTop/></div>
      <div className='chat-middle'><Messages/></div>
      <div className='chat-bottom'><ChatBottom/></div>
      </CurrentRoomProvider>
  )
}

export default Chat
