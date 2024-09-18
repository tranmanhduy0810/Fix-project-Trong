const sql = require("mssql");
const sqlConfig = {
  user: "sa",
  password: "123",
  database: "qlsv",
  server: "192.168.1.21",
  port: 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true,
    connectionTimeout: 30000, // Thiết lập thời gian chờ kết nối
    requestTimeout: 30000, // Thiết lập thời gian chờ truy vấn
    pool: {
      max: 10, // Thiết lập số lượng kết nối tối đa
    },
  },
};

async function ExecQuery(query_sql) {
  let cnn;
  try {
    cnn = await sql.connect(sqlConfig);
    const table = await sql.query(query_sql);
    await cnn.close();
    return table.recordset;
  } catch (err) {
    console.log(err);
    await cnn.close();
    return [];
  }
}

async function ExecNonQuery(query_sql) {
  let cnn;
  try {
    cnn = await sql.connect(sqlConfig);
    const count = await sql.query(query_sql);
    await cnn.close();
    return count.rowsAffected[0];
  } catch (err) {
    console.log(err);
    await cnn.close();
    return 0;
  }
}

async function ExecScalar(query_sql) {
  let cnn;
  try {
    cnn = await sql.connect(sqlConfig);
    const rs = await sql.query(query_sql);
    await cnn.close();
    return rs.recordset[0][""];
  } catch (err) {
    console.log(err);
    await cnn.close();
    return null;
  }
}

module.exports = { ExecQuery, ExecNonQuery, ExecScalar };
