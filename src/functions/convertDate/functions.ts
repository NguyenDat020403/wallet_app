import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
export const convertDate = (createdAt: string) => {
  dayjs.extend(relativeTime);
  dayjs.locale('vi');

  const timeAgo = dayjs(createdAt).fromNow();
  return timeAgo;
};
