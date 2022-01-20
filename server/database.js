const { connect } = require('mongoose');

const startConnection = async () => {
  try {
    const db = await connect('mongodb://localhost/TasksList')
    console.log('Connect on the database success', db.connect.name);
  } catch (err) {
    console.error('Error conectivity to database', err)
  }
}

module.exports = startConnection