const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 7000;
app.use('/bim_apps', express.static(path.join(__dirname, 'build')));
app.get('/bim_apps*', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);
console.log('Server started on port ' + port);
