require('dotenv').config();

const date = new Date();
console.log(Number(date.getDate()));
const currentDay = (((date.getTime()/1000)/60)/60)/24;
console.log(currentDay);
console.log(process.env.STABILITY_API_KEY);