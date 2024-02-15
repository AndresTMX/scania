import moment from "moment";

export const currentDateFormat = moment().format('ll');

export const currentDateTimeZone = moment().utc();

export const dataFormat = (data) => moment(data).format('lll');

export const dateCalendar = (data) => moment(data).subtract(10, 'days').calendar();