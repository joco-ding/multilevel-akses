import db from "./db.js"
import { AKTIFSTATUS } from "../config.js"
import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'

const userLogin = async (req, res) => {
  const { idpengguna, password } = req.body
  if (typeof idpengguna !== 'string' || typeof password !== 'string')
    return res.status(403).json({ ok: false, message: 'Permintaan tidak valid' })

  let row = {}
  try {
    const [rows, _] = await db.query("SELECT t1.id, t1.status, t1.password, SHA2(?, 256) sentpassword, t2.kapabilitas FROM tb_pengguna t1 JOIN tb_kasta t2 ON t2.id=t1.kasta WHERE t1.idpengguna=?", [password, idpengguna])
    if (typeof rows.length === 'number' && rows.length === 1)
      row = rows[0]
  } catch (error) {
    console.error("userLogin #1", error)
    return res.status(500).json({ ok: false, message: 'Terdapat masalah di sistem' })
  }

  if (typeof row.status !== 'string')
    return res.status(403).json({ ok: false, message: 'Akun tidak ditemukan' })

  if (row.password !== row.sentpassword)
    return res.status(403).json({ ok: false, message: 'Password salah' })

  if (row.status !== AKTIFSTATUS)
    return res.status(403).json({ ok: false, message: 'Akun tidak aktif' })

  const kunci = uuidv4()

  try {
    await db.execute("UPDATE tb_pengguna SET kunci = ? WHERE id = ?", [kunci, row.id])
  } catch (error) {
    console.error("userLogin #2", error)
    return res.status(500).json({ ok: false, message: 'Terdapat masalah di sistem' })
  }

  const kapabilitas = row.kapabilitas.split(',')

  const token = jwt.sign({ idpengguna, kapabilitas }, kunci, { expiresIn: "7d" })
  res.json({ ok: true, message: 'Berhasil', data: token })
}

export default userLogin