export function formatTime(timeInSeconds: number) {
  const _timeInSeconds = isNaN(timeInSeconds) ? 0 : timeInSeconds;
  const result = new Date(_timeInSeconds * 1000)?.toISOString()?.substr(11, 8);

  return {
    minutes: result.substr(3, 2),
    seconds: result.substr(6, 2),
  };
}
