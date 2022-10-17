import db from "./db.js"

const productList = async (req, res) => {
  let data = []
  try {
    const [rows, _] = await db.query("SELECT id, title, category, brand FROM tb_products")
    data = rows
  } catch (error) {
    console.error("productList #1", error)
    return res.status(500).json({ ok: false, message: 'Terdapat masalah di sistem' })
  }
  res.json({ ok: true, message: 'Berhasil', data })
}

export default productList