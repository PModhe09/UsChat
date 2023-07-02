import TimeAgo from 'timeago-react';
import ProfileAvatar from '../../ProfileAvatar';
import ProfileBtnModal from './ProfileBtnModal';
import PresenceDot from '../../PresenceDot';
import { useHover } from '@uidotdev/usehooks';
import IconBtnControl from './IconBtnControl';

const MessageItem = ({ message }) => {
  const { author, createdAt, text } = message;
  const [selfRef,isHover]=useHover();

  return (
    <li className={`padded mb-1 cursor-pointer ${isHover ?'bg-black-02':''}`} ref={selfRef}>
      <div className="d-flex align-items-center font-bolder mb-1">
        <PresenceDot uid={author.uid}/>
        <ProfileAvatar
          src={author.avatar}
          name={author.name}
          className="ml-1"
          size="xs"
        />

        {/* <span className="ml-2">{author.name}</span> */}
        <ProfileBtnModal profile={author}/>
        <TimeAgo
          datetime={createdAt}
          className="font-normal text-black-45 ml-2"
        />
        <IconBtnControl
          {...(true ? { color: 'red' } : {})}
          isVisible
          iconName="heart"
          tooltip="Like this message"
          onClick={() => {}}
          badgeContent={5}
        />
      </div>

      <div>
        <span className="word-breal-all">{text}</span>
      </div>
    </li>
  );
};

export default MessageItem;