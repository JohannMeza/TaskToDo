const app = require('./app.js');
const startConnection = require('./database');

// --- Database
startConnection()

app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'))
});