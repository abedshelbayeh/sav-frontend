export const getTimeParts = (ms) => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);

  return {
    minutes: minutes <= 9 ? `0${minutes}` : minutes,
    seconds: seconds <= 9 ? `0${seconds}` : seconds,
  };
};

export const getProgress = (current, total) => {
  const currentSeconds = Math.floor(current / 1000);
  const totalSeconds = Math.floor(total / 1000);
  return ((totalSeconds - currentSeconds) / totalSeconds) * 100;
};

export const buildTime = (minutes, seconds) => {
  return parseInt(minutes) * 60 * 1000 + parseInt(seconds) * 1000;
};
