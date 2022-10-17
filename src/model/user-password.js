import db from "./db.js"

const userPassword = async (req, res) => {
  const { password } = req.body
  if (typeof password !== 'string')
    return res.status(403).json({ ok: false, message: 'Permintaan tidak valid' })

  try {
    await db.execute("UPDATE tb_pengguna SET password=SHA2(?, 256) WHERE idpengguna=?", [password, req.user.idpengguna])
  } catch (error) {
    console.error("userPassword #1", error)
    return res.status(500).json({ ok: false, message: 'Terdapat masalah di sistem' })
  }
  res.json({ ok: true, message: 'Berhasil' })
}

export default userPassword