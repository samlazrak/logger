class db_manager {
  constructor() {
    const database = require('./db')
    const db = new database(process.env.DB_FILEPATH)

    const log = require('../models/log_model')
    const logs = new log(db)
  }
}

module.exports = db_manager
