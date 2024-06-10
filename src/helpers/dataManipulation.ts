export const filterData = (data: any, attribute: string, values: string[]) => {
    return data.filter((datum: any) => !values.includes(datum[attribute]));
}

export const listGroupBy = function (arr: any[], key: any) {
    return arr.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);

        return rv;
    }, {});
};

export const formatNumber = (amount: number) => {
    return amount.toLocaleString(undefined, {maximumFractionDigits: 2});
}

export const removeEmptyFromObject = (obj: object) => {
    return Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== undefined && value !== null && value.length !== 0));
}

export const formatKpiTarget = (target: string) => {
    return target.includes('%') || target.includes('.') || isNaN(parseInt(target)) ? target : formatNumber(parseInt(target))
}

export const onlyUnique = (value: any, index: number, array: any[]) => {
    return array.indexOf(value) === index;
}

export const convertEpoch = (value) => {
    if (!value) {
        return ''
    }
    const time = new Date(Number(value));
    if (isNaN(time.valueOf())) {
        return '';
    }
    return time.toLocaleString("en-US", {hour: "numeric", minute: "numeric", hour12: true});
}