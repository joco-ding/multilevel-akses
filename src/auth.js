import jwt from 'jsonwebtoken'
import { AKTIFSTATUS, SUPERUSER } from "./config.js"
import url from "url"
import db from "./model/db.js"

export default async function (req, res, next) {
  const token = req.header('token')

  if (token === '' || typeof token !== 'string')
    return res.status(403).json({ ok: false, message: 'Permintaan tidak valid #1' })

  const decodedToken = jwt.decode(token)

  if (decodedToken === null || typeof decodedToken.idpengguna !== 'string')
    return res.status(403).json({ ok: false, message: 'Permintaan tidak valid #3' })

  let row = {}
  try {
    const [rows, _] = await db.query(`SELECT t1.status, t1.kunci, t1.namalengkap, t2.kapabilitas FROM tb_pengguna t1 JOIN tb_kasta t2 ON t2.id=t1.kasta WHERE t1.idpengguna=?`, [decodedToken.idpengguna])
    if (typeof rows.length === 'number' && rows.length === 1) row = rows[0]
  } catch (error) {
    console.error('auth #1', error)
    return res.status(500).json({ ok: false, message: 'Terdapat masalah di sistem' })
  }

  if (typeof row.kunci !== 'string')
    return res.status(403).json({ ok: false, message: 'Permintaan tidak valid #4' })

  if (row.status !== AKTIFSTATUS)
    return res.status(403).json({ ok: false, message: 'Permintaan tidak valid #5' })

  try {
    jwt.verify(token, row.kunci)
  } catch (error) {
    console.error('auth #2', error)
    return res.status(403).json({ ok: false, message: 'Permintaan tidak valid #5' })
  }

  if (row.kapabilitas !== SUPERUSER) {
    const allowPaths = row.kapabilitas.split(',')
    const path = url.parse(req.originalUrl).pathname
    if (!allowPaths.includes(path))
      return res.status(403).json({ ok: false, message: 'Permintaan tidak valid #6' })
  }
  req.user = { namalengkap: row.namalengkap, idpengguna: decodedToken.idpengguna }
  return next()
}