import React from 'react'
import RoomItem from './RoomItem'
import { Nav } from 'rsuite'

const ChatRoomList = ({aboveElHeight}) => {
  return (
    <div>
        <Nav appearence="subtle" vertical reversed className="overflow-y-scroll custom-scroll" style={{
            height:`calc(100%-${aboveElHeight}px`,
        }}>
            <Nav.Item>
                <RoomItem/>
            </Nav.Item>
        </Nav>
    </div>
  )
}

export default ChatRoomList
