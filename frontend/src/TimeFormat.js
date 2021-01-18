export default function TimeFormat(time) {
  const seconds = Math.floor(time / 1000) % 60;
  const minutes = Math.floor(time / 1000 / 60) % 60;
  const hours = Math.floor(time / 1000 / 60 / 60);

  let ret = "";
  if (hours > 0) {
    ret += hours + ":";
  }
  if (ret != "" && minutes < 10) {
    ret += "0";
  }
  ret +=
    minutes +
    ":" +
    seconds.toString().padStart(2, "0") +
    "." +
    (time % 1000).toString().padStart(3, "0");
  return ret;
}
