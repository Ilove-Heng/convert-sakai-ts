import dayjs from "dayjs";

// Import plugins
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

// Set the default timezone
dayjs.tz.setDefault('Asia/Phnom_Penh');

// Create a custom instance with default format
const customDayjs = ((date?: dayjs.ConfigType) => {
  return dayjs(date).tz('Asia/Phnom_Penh');
}) as typeof dayjs;

// Copy all static methods and properties from dayjs
Object.setPrototypeOf(customDayjs, dayjs);
Object.assign(customDayjs, dayjs);

// Override the format method on the prototype
const originalFormat = dayjs.prototype.format;
dayjs.prototype.format = function (formatString?: string) {
  return originalFormat.call(this, formatString ?? 'YYYY-MM-DD');
};

// Export the configured dayjs
export default customDayjs;