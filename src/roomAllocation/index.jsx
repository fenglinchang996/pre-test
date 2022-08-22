import { useEffect, useReducer, useState } from 'react';
import CustomInputNumber from '../customInputNumber';
import styles from './index.module.css';

const roomListReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'init':
      return payload;
    case 'update':
      const { idx, adult, child } = payload;
      return state.map((item, index) =>
        index === idx ? { adult, child } : item
      );
    default:
      return state;
  }
};

const RoomAllocation = ({ guest = 1, room = 1, onChange }) => {
  const [unAllocatedGuest, setUnAllocatedGuest] = useState(guest - room);
  const [roomList, dispatchRoomList] = useReducer(roomListReducer, []);
  useEffect(() => {
    dispatchRoomList({
      type: 'init',
      payload: Array(room)
        .fill()
        .map((_) => {
          return {
            adult: 1,
            child: 0,
          };
        }),
    });
  }, [room, guest]);
  useEffect(() => {
    setUnAllocatedGuest(
      guest - roomList.reduce((sum, { child, adult }) => sum + child + adult, 0)
    );
    onChange(roomList);
  }, [roomList]);
  const updateRoomList = (idx, adult, child) =>
    dispatchRoomList({
      type: 'update',
      payload: {
        idx,
        adult,
        child,
      },
    });
  return (
    <div className={styles['container']}>
      <section className={styles['guest-room-number']}>
        住客人數： {guest} 人 / {room} 房
      </section>
      <section className={styles['unallocated-guest-number']}>
        尚未分配人數：{unAllocatedGuest} 人
      </section>
      <section>
        <ul className={styles['room-list']}>
          {roomList.map((roomInfo, idx) => {
            const { adult, child } = roomInfo;
            return (
              <RoomBlock
                key={idx}
                idx={idx}
                roomMax={4}
                adult={adult}
                child={child}
                unAllocatedGuest={unAllocatedGuest}
                onChange={updateRoomList}
              />
            );
          })}
        </ul>
      </section>
    </div>
  );
};

const RoomBlock = ({
  idx,
  roomMax,
  adult,
  child,
  unAllocatedGuest,
  onChange,
}) => {
  const total = adult + child;
  const available =
    roomMax - total < unAllocatedGuest ? roomMax - total : unAllocatedGuest;
  return (
    <div className={styles['room']}>
      <div className={styles['room-total-guest']}>房間：{total} 人</div>
      <GuestNumberInput
        title="大人"
        detail="年齡 20+"
        name="adult"
        min={1}
        max={adult + available}
        value={adult}
        onChange={(newVal) => {
          if (newVal <= adult + available && newVal >= 1) {
            onChange(idx, newVal, child);
          }
        }}
      />
      <GuestNumberInput
        title="小孩"
        name="child"
        min={0}
        max={child + available}
        value={child}
        onChange={(newVal) => {
          if (newVal <= child + available && newVal >= 0) {
            onChange(idx, adult, newVal);
          }
        }}
      />
    </div>
  );
};

const GuestNumberInput = ({
  title,
  detail,
  name,
  value,
  max,
  min,
  onChange,
}) => {
  const [number, setNumber] = useState(value);
  useEffect(() => {
    onChange(number);
  }, [number]);
  return (
    <div className={styles['guest-number-input']}>
      <div className={styles['guest-number-input__info']}>
        <div>{title}</div>
        <div className={styles['guest-number-input__info--detail']}>
          {detail}
        </div>
      </div>
      <div>
        <CustomInputNumber
          name={name}
          value={number}
          max={max}
          min={min}
          step={1}
          disabled={max === min}
          onChange={(e) => {
            const num = Number(e.target.value);
            setNumber(num);
          }}
          onBlur={(e) => {
            const num = Number(e.target.value);
            if (Object.is(num, NaN)) {
              setNumber(min);
            } else if (num > max) {
              setNumber(max);
            } else if (num < min) {
              setNumber(min);
            } else {
              setNumber(num);
            }
          }}
        />
      </div>
    </div>
  );
};

export default RoomAllocation;
