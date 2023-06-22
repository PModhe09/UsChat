import React from 'react'
import DashBoardToggle from './dashboard/DashBoardToggle'
import CreateRoomBtnModal from './CreateRoomBtnModal'

const Sidebar = () => {
  return (
    <div>
       <div className='h-100 pt-2'>
        <div><DashBoardToggle/><CreateRoomBtnModal/></div>

       </div>
       bottom
    </div>
  )
}

export default Sidebar
