import moment from "moment";

export const currentDateFormat = moment().format('ll');

export const dataFormat = (data) => moment(data).format('lll');