import mysql from "mysql2";
import dotenv from "dotenv";
import { getStartAndEndTImeFromDate } from './Utils/helper.js';

dotenv.config();

const table_name = process.env.TABLE_NAME;

//mysql database connection code
const db = mysql
  .createPool({
    host: process.env.HOST,
    user: process.env.USER_NAME,
    port: process.env.PORT,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    timezone: 'Z'
  })
  .promise();

//get table data 
async function getBooking() {
  const [rows] = await db.query(`SELECT * FROM ${table_name} ORDER BY date DESC`);
  return rows;
}

//get perticuler record from table 
async function getBookingById(id) {
  const [rows] = await db.query(`SELECT * FROM ${table_name} WHERE id = ?`, [
    id,
  ]);
  return rows[0];
}

//add record in table 
async function addBooking(payload) {
  const { name, date, hours } = payload;
  const { start_time, end_time } = getStartAndEndTImeFromDate(date, hours);
  const isAvailable = await checkAvailability(date, start_time, end_time);

  if (!isAvailable)
    return { data: {}, message: "Selected Time window is already booked", pass: false };

  const [result] = await db.query(`INSERT INTO ${table_name} (name, date, start_time, end_time, hours) VALUES (?, ?, ?, ?, ?)`, [
    name, date, start_time, end_time, hours
  ]);
  const id = result?.insertId;
  const record = id && await getBookingById(id);
  return { data: record, message: "success", pass: true };
}

//update record in table 
async function updateBooking(payload) {
  const id = payload.id;
  delete payload.id;
  const parameters = Object.keys(payload).length && Object.keys(payload).map(item => payload[item]);
  parameters.push(id);
  const [result] = await db.query(`UPDATE ${table_name} SET name = ?, date = ?, hours= ? WHERE id = ?`, parameters)
  const record = result?.affectedRows && await getBookingById(id);
  return record;
}

//delete record from table 
async function deleteBooking(id) {
  const [result] = await db.query(`DELETE FROM ${table_name} WHERE id = ?`, [
    id,
  ]);
  return result.affectedRows;
}


//check time slot availability in databse 
async function checkAvailability(date, startTime, endTime) {
  const query = `
    SELECT *
    FROM ${table_name}
    WHERE
    date = ? AND (
    (start_time < ? AND end_time > ?)
    OR (start_time < ? AND end_time > ?)
    OR (start_time <= ? AND end_time >= ?)
  );
  `;

  const [rows] = await db.query(query, [
    date,
    endTime,
    startTime,
    endTime,
    startTime,
    startTime,
    endTime
  ]);

  return rows.length === 0;
}


export {
  getBooking,
  getBookingById,
  addBooking,
  updateBooking,
  deleteBooking
}
