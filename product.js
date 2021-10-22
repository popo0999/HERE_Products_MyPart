const express = require('express');
const db = require('../../modules/connect-mysql');
const router = express.Router();

router.get('/', async (req, res) => {
  const t_sql = `SELECT * FROM products_view`;
  const [total] = await db.query(t_sql);
  res.json(total);
});
router.get('/productsDetail/:sid', async (req, res) => {
  const sql = 'SELECT * FROM products_view WHERE sid= ?';
  const [total] = await db.query(sql, [req.params.sid]);
  res.json(total);
});

router.get('/like', async (req, res) => {
  const likeSql = `SELECT * FROM products_view limit 0,4`;
  const [total] = await db.query(likeSql);
  res.json(total);
});
router.get('/color/:sid', async (req, res) => {
  const colorSql = `SELECT * FROM products_color WHERE products_sid= ?`;
  const [total] = await db.query(colorSql, [req.params.sid]);
  res.json(total);
});
router.get('/stock/:sid/:color', async (req, res) => {
  const stockSql = `SELECT s.*,c.color,c.colorImg,c.products_sid FROM products_stock s JOIN products_color c ON color_id=c.id WHERE products_sid= ? && color = ?`;
  const [total] = await db.query(stockSql, [req.params.sid, req.params.color]);
  res.json(total);
});
router.get('/detailImg/:sid/:color', async (req, res) => {
  const stockSql = `SELECT * FROM products_images JOIN products_color ON color_id=products_color.id WHERE products_sid= ? && color = ?`;
  const [total] = await db.query(stockSql, [req.params.sid, req.params.color]);
  res.json(total);
});

router.get('/featured', async (req, res) => {
  const featuredSql = `SELECT * FROM products_view where featured = 1`;
  const [total] = await db.query(featuredSql);
  res.json(total);
});
// router.get('/sortByPriceH2L', async (req, res) => {
//   const sql = `SELECT * FROM products_view order by price DESC`;
//   const [total] = await db.query(sql);
//   res.json(total);
// });

// ---------------評論留言----------------------
router.get('/review/:sid', async (req, res) => {
  const reviewSql = `SELECT pr.*, m.nickname FROM products_review pr JOIN members m ON m.id=members_id where 	products_sid = ?`;
  const [total] = await db.query(reviewSql, [req.params.sid]);
  res.json(total);
});
router.post('/review/:sid/add', async (req, res) => {
  const reviewAddSql =
    'INSERT INTO `products_review`(`products_sid`, `members_id`, `star`, `title`, `content`) VALUES (?,?,?,?,?)';
  const [total] = await db.query(reviewAddSql, [
    req.params.sid,
    req.body.members_id,
    req.body.star,
    req.body.title,
    req.body.content,
  ]);
  res.json(total);
});
// ---------------評論留言END----------------------

// ---------------收藏CRD----------------------
router.get('/like/:sid', async (req, res) => {
  const likeSql = `SELECT * FROM members_favorite where 	products_sid = ? `;
  const [total] = await db.query(likeSql, [req.params.sid]);
  res.json(total);
});
router.post('/likeAdd', async (req, res) => {
  const likeAddSql =
    'INSERT INTO `members_favorite`(`members_id`, `products_sid`) VALUES (?,?) ';
  const [total] = await db.query(likeAddSql, [
    req.body.id,
    req.body.products_sid,
  ]);
  res.json(total);
});
router.delete('/likeDel', async (req, res) => {
  const likeDelSql = `DELETE FROM members_favorite WHERE members_id=? AND products_sid=?`;
  const [total] = await db.query(likeDelSql, [
    req.body.id,
    req.body.products_sid,
  ]);
  res.json(total);
});
// ---------------加入收藏END----------------------

module.exports = router;
