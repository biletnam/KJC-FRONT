export const toISOString = (date, separator) => {
    const year = date.getFullYear();
    const m = date.getMonth();
    const month = Number( m + 1) < 10 ? '0' + ( m + 1) : (m + 1)+'';
    const d = date.getDate();
    const dd = Number(d) < 10 ? '0' + d : d;

    return year + separator + month + separator + dd;
}

export const toISOTimeString = (date, separator, tSeparator) => {
    const year = date.getFullYear();
    const m = date.getMonth();
    const month = Number( m + 1) < 10 ? '0' + ( m + 1) : (m + 1)+'';
    const d = date.getDate();
    const dd = Number(d) < 10 ? '0' + d : d;

    const h = date.getHours();
    const mi = date.getMinutes();

    const hour =  Number(h) < 10 ? '0' + h : h +'';
    const minute =  Number(m) < 10 ? '0' + m : m +'';
    return year + separator + month + separator + dd + tSeparator + hour + ':' + minute;
}