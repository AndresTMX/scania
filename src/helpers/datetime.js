import moment from "moment-timezone";
import '../moment-es'; 
moment.locale('moment-es')

export const currentDateFormat = moment().format('ll');

export const currentDateTimeZone = moment().utc();

export const transformTimeZone = (date) => moment.utc(date).tz('America/Mexico_City');

export const dataFormat = (date) => moment.utc(date).tz('America/Mexico_City').format('ll');

export const dateCalendar = (data) => moment(data).format('l');