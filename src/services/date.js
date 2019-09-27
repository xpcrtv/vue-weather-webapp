import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/en';

dayjs.extend(LocalizedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.locale('en');

const timeOffset = dayjs().utcOffset();

export default {
  getTimeFromNow(time) {
    return dayjs(time).fromNow();
  },
  getTimeWithOffset(time) {
    return dayjs(time).add(timeOffset, 'minutes');
  },
  formatDate(time, template) {
    return dayjs(time).format(template);
  },
  parseDateWithTemlate(time, template = 'HH:mm') {
    return dayjs(time, template);
  },
};
