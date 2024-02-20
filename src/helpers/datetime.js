import moment from "moment-timezone";

export const currentDateFormat = moment().format('ll');

export const currentDateTimeZone = moment().utc();

export const transformTimeZone = (date) => moment.utc(date).tz('America/Mexico_City');

export const dataFormat = (date) => moment.utc(date).tz('America/Mexico_City').format('lll');

export const dateCalendar = (data) => moment(data).subtract(10, 'days').calendar();