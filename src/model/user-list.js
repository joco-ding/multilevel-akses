import { KASTAUSER } from "../config.js"
import db from "./db.js"

const userList = async (req, res) => {
  let data = []
  try {
    const [rows, _] = await db.query("SELECT idpengguna, namalengkap, status, added FROM tb_pengguna WHERE kasta=?", [KASTAUSER])
    data = rows
  } catch (error) {
    console.error("userList #1", error)
    return res.status(500).json({ ok: false, message: 'Terdapat masalah di sistem' })
  }
  res.json({ ok: true, message: 'Berhasil', data })
}

export default userList