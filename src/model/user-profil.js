const userProfil = (req, res) =>
  res.json({ ok: true, message: "Berhasil", data: req.user })

export default userProfil