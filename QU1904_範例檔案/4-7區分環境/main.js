if (process.env.NODE_ENV === 'production') {
  console.log('你正線上上環境');
} else {
  console.log('你正在使用開發環境');
}

console.log(process.env.NODE_ENV);
