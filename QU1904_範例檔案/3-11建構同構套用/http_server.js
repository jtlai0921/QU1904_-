const express = require('express');
const { render } = require('./dist/bundle_server');
const app = express();

// 呼叫建構出的 bundle_server.js 中曝露出的著色函數，再拼接下 HTML 模版，形成完整的 HTML 檔案
app.get('/', function (req, res) {
  res.send(`
<html>
<head>
  <meta charset=utf-8"UTF-8">
</head>
<body>
<div id="app">${render()}</div>
<!--匯入 webpack 輸出的用於瀏覽器端著色的 JS 檔案-->
<script src="./dist/bundle_browser.js"></script>
</body>
</html>
  `);
});

// 其它請求路徑傳回對應的本機檔案
app.use(express.static('.'));

app.listen(3000, function () {
  console.log('app listening on port 3000!')
});
