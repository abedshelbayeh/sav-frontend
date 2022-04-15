import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTimeParts, getProgress, buildTime } from "./timer.utils";

// styles
import { Button } from "antd";
import {
  CaretRightFilled,
  PauseOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import * as Styled from "./timer.styles";

// actions
import {
  setTime,
  pauseTimer,
  startTimer,
  addTime,
} from "../../redux/canvas/canvas.actions";

// assets
import Timesup from "../../assets/timesup.wav";
const timesup = new Audio(Timesup);

const Timer = () => {
  const dispatch = useDispatch();

  const [timer, setTimer] = useState(0);

  const { time, pause, running, deadline } = useSelector(
    ({ canvas: { settings: { timer = {} } = {} } = {} }) => timer
  );

  const timeoutRef = useRef(null);
  const runningRef = useRef(null);
  runningRef.current = running;

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    const id = setTimeout(() => {
      if (runningRef.current && timer > 1000) {
        setTimer(timer - 1000);
      }
      if (runningRef.current && timer <= 1000) {
        if (timesup.paused) timesup.play();
        dispatch(pauseTimer(0));
      }
    }, 1000);
    timeoutRef.current = id;
    return () => clearTimeout(timeoutRef.current);
  }, [dispatch, running, timer]);

  useLayoutEffect(() => {
    const remaining = deadline - new Date();
    setTimer(remaining >= 0 ? remaining : 0);
  }, [deadline]);

  const remaining = pause || timer;
  const { minutes, seconds } = getTimeParts(remaining);
  const progress = getProgress(remaining, time);

  const addMinutes = (m) => {
    const t = remaining + m * 60 * 1000;
    if (t >= 60 * 60 * 1000) return;
    dispatch(addTime(t));
  };

  return (
    <Styled.Container>
      <Styled.Overlay style={{ transform: `translateX(${-progress}%)` }} />
      <Styled.Timer>
        <Styled.Time className={!running && "blink"}>
          <Styled.Component
            onChange={({ target: { value: m } }) => {
              if (m && m <= 59) {
                dispatch(setTime(buildTime(m, seconds)));
              }
            }}
            readOnly={running}
            value={minutes}
          />
          <span>:</span>
          <Styled.Component
            onChange={({ target: { value: s } }) => {
              if (s && s <= 59) {
                dispatch(setTime(buildTime(minutes, s)));
              }
            }}
            readOnly={running}
            value={seconds}
          />
        </Styled.Time>
        <Styled.Actions>
          <Button
            type="primary"
            shape="circle"
            icon={running ? <PauseOutlined /> : <CaretRightFilled />}
            onClick={() => {
              running ? dispatch(pauseTimer(timer)) : dispatch(startTimer());
            }}
          />
        </Styled.Actions>
      </Styled.Timer>
      <Styled.Add>
        <Button
          type="text"
          size="small"
          icon={<PlusCircleOutlined />}
          onClick={() => addMinutes(1)}
        >
          1m
        </Button>
        <Button
          type="text"
          size="small"
          icon={<PlusCircleOutlined />}
          onClick={() => addMinutes(5)}
        >
          5m
        </Button>
        <Button
          type="text"
          size="small"
          icon={<PlusCircleOutlined />}
          onClick={() => addMinutes(10)}
        >
          10m
        </Button>
      </Styled.Add>
    </Styled.Container>
  );
};

export default Timer;
