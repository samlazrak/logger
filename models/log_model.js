class log_model {
  constructor(db) {
    this.db = db
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT,
      amount TEXT,
      date TEXT
    )`
  }

  create(type, amount, date) {
    return this.db.run(
      `INSERT INTO logs (type, amount, date) VALUES (?, ?, ?)`[
        (type, amount, date)
      ]
    )
  }
}

module.exports = log_model
