import { KASTAADMIN } from '../config.js'
import db from './db.js'

const adminList = async (req, res) => {
  let data = []
  try {
    const [rows, _] = await db.query("SELECT idpengguna, namalengkap, status, added FROM tb_pengguna WHERE kasta=? AND idpengguna!=?", [KASTAADMIN, req.user.idpengguna])
    data = rows
  } catch (error) {
    console.error("adminList #1", error)
    return res.status(500).json({ ok: false, message: 'Terdapat masalah di sistem' })
  }
  res.json({ ok: true, message: 'Berhasil', data })
}

export default adminList