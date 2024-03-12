import moment from "moment-timezone";
import '../moment-es';
moment.locale('moment-es')

export const currentDateFormat = moment().format('ll');

export const currentDateCalendar = moment().format('DD-MM-YYYY');

export const currentDateTimeZone = moment().utc();

export const transformTimeZone = (date) => moment.utc(date).tz('America/Mexico_City');

export const dataFormat = (date) => moment.utc(date).tz('America/Mexico_City').format('ll h:mm A');

export const dateCalendar = (data) => moment(data).format('l');

export function tiempoTranscurrido(inicio, fin) {

    try {

        let finDefault = moment()

        if (fin != null) {
            finDefault = moment(fin)
        }

        const newInit = moment(inicio)
        const diferenciaEnDias = finDefault.diff(newInit, 'days', true);

        return Math.round(diferenciaEnDias);

    } catch (error) {
        console.error(error)
    }
}

export function transformDateFilter(fecha) {
    try {

        const fechaParsed = moment(fecha, 'YYYY-MM-DD').startOf('day');;

        const fechaDestino = fechaParsed.format('YYYY-MM-DDTHH:mm:ss[Z]');

        return fechaDestino

    } catch (error) {
        console.error(error)
    }
}

export function transformDateFilterEnd(fecha) {
    try {

        const fechaParsed = moment(fecha, 'YYYY-MM-DD').endOf('day');

        const fechaDestino = fechaParsed.format('YYYY-MM-DDTHH:mm:ss[Z]');

        return fechaDestino

    } catch (error) {
        console.error(error)
    }
}


export const dateFilterInitDefault = moment().startOf('month').format('YYYY-MM-DDTHH:mm:ss[Z]');
export const dateFilterEndDefault = moment().endOf('month').format('YYYY-MM-DDTHH:mm:ss[Z]');
