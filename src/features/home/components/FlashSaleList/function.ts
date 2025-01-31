export const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return {
    hours: hours,
    minutes: minutes < 10 ? `0${minutes}` : minutes,
    seconds: secs < 10 ? `0${secs}` : secs,
  };
};
