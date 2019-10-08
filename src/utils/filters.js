import * as config from 'config';

export const to10k = (num, str) => {
    num = +num;
    if (num < 100 && str) {
        return str;
    } else {
        return (num / 10000 | 0).toFixed(2) + '万';
    }
}
//去除空格
export const trim = (str = '') => {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

export const currency = (p, s = '¥ ', dec = 0) => {
    if (Math.abs(p) !== 0 && !Math.abs(p)) return s + '0';
    p = (p + '').split('.');
    let inte = p[0], deci = p[1];
    return s + inte.replace(/(?!^)(?=(\d{3})+$)/g, ',') + (dec > 0 ? ('.' + deci) : '');
}
//GMT格式转成YY-MM-DD格式
export const timeGMT = (val, AddDayCount = 0) => {
    if (!val) return "";
    let date = new Date(val)
    let year = date.getFullYear();
    let month, day;
    date.setDate(date.getDate() + AddDayCount);//获取AddDayCount天后的日期
    if (+date.getMonth() + 1 < 10) {
        month = '0' + (date.getMonth() + 1);
    } else {
        month = date.getMonth() + 1;
    }
    if (+date.getDate() < 10) {
        day = '0' + (date.getDate());
    } else {
        day = date.getDate();
    }
    return year + '-' + month + '-' + day;
}
//七牛key转成url输出
export const imageKeyF = (value, width = 300, height = 300, watermark = false ) => {
    if (!value) return config.DEFAULT_IMG;
    value = value.toString();
    return `${config.QINIU_CDN}${value}?imageView2/1/w/${width}/h/${height}/q/95${watermark ? '|watermark/2/text/5LiD5LiB/font/5qW35L2T/fontsize/' + width * 3 + '/fill/I0ZGRkZGRg==/dissolve/90/gravity/SouthEast/dx/10/dy/10|imageslim' : ''}`

}
//分转换成元，并且保留两位小数
export const moneyF = (value) => {
    if (!value || isNaN(+value)) return '0.00';
    return (value / 100).toFixed(2);
}
