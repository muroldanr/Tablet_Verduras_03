import moment, { locale } from 'moment';

export const getPersonDate = (date) => {

    const d = new Date(date);
    let formatDate =  moment(d).format('hh:mm: A');
    return formatDate;
}

export const getPersonDateNoHour = (date) => {

    const d = new Date(date);
    let formatDate =  moment(d).format('YYYYMMDD');
    return formatDate;
}

export const getDateRequest = (date) => {

    const d = new Date(date);
    let formatDate =  moment(d).format('L');
    return formatDate;
}


export const dateForView = (date) => {

    const d = new Date(date);
    let formatDate =  moment(d).format('L');
    return formatDate;
}

