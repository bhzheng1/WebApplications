//日期和时间

import moment from './moment.js'
{
    new Date(1554143766065);//UTC时间戳 -> time
    new Date(2019,4,1); //年 月 日 -> time
    let ms = Date.parse('2012-01-26T13:51:50.417-07:00');
    let ms1 = Date.parse('2012-01-26T15:51:50.417-05:00');
    console.log(ms); // 1327611110417  时间戳
    console.log(ms1); // 1327611110417  时间戳

    let today = new Date();//Fri Apr 05 2019 23:22:24 GMT-0400 (Eastern Daylight Time)

    today.getFullYear();
    today.getMonth();
    today.getDate();
    today.getHours();
    today.getMinutes();
    today.getSeconds();
    today.getMilliseconds();
    today.getTimezoneOffset(); //返回时区偏移数，以分钟为单位：

    today.getUTCFullYear();

    today.getTime();//time -> 时间戳, 从1970-1-1 00:00:00 UTC+0 开始的毫秒数,同一时间点，所有时区的时间戳都是一样的
    Date.now();// ->时间戳
    JSON.stringify(today); //time -> string
    new Date(JSON.parse(JSON.stringify(today))); //time -> string -> time
    new Date().toJSON();
    moment().format();
}
