import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export enum defaultFormat {
  d1 = "YYYY-MM-DD HH:mm:ss",
}

export function formatDate_UTC(
  UTCString: string,
  format: string = defaultFormat.d1,
) {
  return dayjs.utc(UTCString).utcOffset(8).format(format);
}
