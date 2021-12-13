const express = require('express');
const db = require('../../modules/connect-mysql');
const router = express.Router();

router.post('/test', async (req, res) => {
  let options = {
    gender: req.body.gender,
    sortBy: req.body.sortBy,
    brands: req.body.brands,
    type: req.body.type,
    price: req.body.price,
    // priceLow: req.body.price[0],
    // priceHigh: req.body.price[1],

    keyword: '',
    page: req.body.page,
  };
  let op = {
    perPage: 16,
    page: 1,
    sortBy: '',
    gender: null,
    type: null,
    brands: null,
    priceLow: 0,
    priceHigh: 0,
    keyword: '',
    ...options,
  };
  const output = {
    perPage: op.perPage,
    page: op.page,
    totalRows: 0,
    totalPages: 0,
    rows: [],
  };
  let where = ' WHERE sid<1000 ';

  if (op.gender) {
    where += ' AND categories_id in ' + '(' + op.gender + ') ';
  }
  if (op.type) {
    where += ' AND type_id in ' + '(' + op.type + ') ';
  }
  if (op.brands) {
    where += ' AND brands_id in ' + '(' + op.brands + ') ';
  }
  if (op.price) {
    where += ' AND price < ' + op.price[1] + ' AND price > ' + op.price[0];
  }
  if (op.keyword) {
    where += ' AND name LIKE ' + db.escape('%' + op.keyword + '%') + ' ';
  }

  if (op.sortBy === 'l2h') {
    where += ' order by price ';
  }
  if (op.sortBy === 'h2l') {
    where += ' order by price DESC';
  }
  if (op.sortBy === 'newest') {
    where += ' order by created_time DESC';
  }
  if (op.sortBy === 'TopSeller') {
    where += ' order by sales DESC';
  }

  const t_sql = `SELECT COUNT(1) totalRows FROM products_view ${where}`;
  const [t_rs] = await db.query(t_sql);
  const totalRows = t_rs[0].totalRows;

  if (totalRows > 0) {
    output.totalRows = totalRows;
    output.totalPages = Math.ceil(totalRows / op.perPage);

    const sql = `SELECT * FROM products_view ${where} LIMIT ${
      op.page * op.perPage
    }`;

    const [rs] = await db.query(sql);
    output.rows = rs;
  }

  res.json(output);
});
router.get('/search', async (req, res) => {
  let op = {
    perPage: 16,
    page: 1,
  };
  const output = {
    perPage: op.perPage,
    page: op.page,
    totalRows: 0,
    totalPages: 0,
    rows: [],
  };
  let where = ' WHERE 1 ';

  if (req.query.keyword) {
    where += ' AND name LIKE ' + db.escape('%' + req.query.keyword + '%') + ' ';
  }

  const t_sql = `SELECT COUNT(1) totalRows FROM products_view ${where}`;
  const [t_rs] = await db.query(t_sql);
  const totalRows = t_rs[0].totalRows;

  if (totalRows > 0) {
    output.totalRows = totalRows;
    output.totalPages = Math.ceil(totalRows / op.perPage);

    const sql = `SELECT * FROM products_view ${where} LIMIT ${
      op.page * op.perPage
    }`;

    const [rs] = await db.query(sql);
    output.rows = rs;
  }

  res.json(output);
});
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
  const likeSql = `SELECT * FROM products_view `;
  const [total] = await db.query(likeSql);
  res.json(total);
});
router.get('/color/:sid', async (req, res) => {
  const colorSql = `SELECT * FROM products_color WHERE products_sid= ?`;
  const [total] = await db.query(colorSql, [req.params.sid]);
  res.json(total);
});
router.post('/color/sid', async (req, res) => {
  const sql = `SELECT * FROM products_color WHERE products_sid= ?`;
  const [total] = await db.query(sql, [req.body.sid]);
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
router.get('/featured/henry', async (req, res) => {
  const sql = `SELECT * FROM products_view where categories_id=3 order by created_time DESC limit 0,4`;
  const [total] = await db.query(sql);
  res.json(total);
});
router.get('/brands', async (req, res) => {
  const sql = `SELECT * FROM products_brands`;
  const [total] = await db.query(sql);
  res.json(total);
});
router.get('/type', async (req, res) => {
  const sql = `SELECT * FROM products_type`;
  const [total] = await db.query(sql);
  res.json(total);
});

// ---------------評論留言----------------------
router.get('/review/:sid', async (req, res) => {
  const reviewSql = `SELECT pr.*, m.nickname, m.avatar FROM products_review pr JOIN members m ON m.id=members_id where 	products_sid = ? ORDER by created_time DESC`;
  const [total] = await db.query(reviewSql, [req.params.sid]);
  res.json(total);
});
router.post('/reviewMember', async (req, res) => {
  const sql = `SELECT pr.*, m.id,m.nickname FROM products_review pr JOIN members m ON m.id=members_id where 	products_sid = ? AND members_id=?`;
  const [total] = await db.query(sql, [req.body.sid, req.body.id]);
  res.json(total);
});
router.post('/review/add', async (req, res) => {
  const reviewAddSql =
    'INSERT INTO `products_review` (`products_sid`, `members_id`, `star`,  `title`, `content`) VALUES (?,?,?,?,?)';
  const [total] = await db.query(reviewAddSql, [
    req.body.sid,
    req.body.members_id,
    req.body.star,
    req.body.title,
    req.body.content,
  ]);
  res.json(total);
});
router.put('/review/edit', async (req, res) => {
  const sql =
    'UPDATE `products_review` SET `star`=?,`images`=?,`title`=?,`content`=? WHERE id=? ';
  //  `id`=?,`products_sid`=?,`members_id`=?,
  const [total] = await db.query(sql, [
    req.body.star,
    req.body.images,
    req.body.title,
    req.body.content,
    req.body.id,
  ]);
  res.json(total);
});
router.delete('/review/del', async (req, res) => {
  const likeDelSql = `DELETE FROM products_review  WHERE id=?`;
  const [total] = await db.query(likeDelSql, [req.body.id]);
  res.json(total);
});
router.get('/reviewStar/:sid', async (req, res) => {
  const sql = `SELECT AVG(star) avgStar FROM products_review WHERE products_sid = ?`;
  const [total] = await db.query(sql, [req.params.sid]);
  res.json(total);
});
// ---------------評論留言END----------------------

// ---------------收藏CRD----------------------

router.post('/like/:sid', async (req, res) => {
  const likeSql = `SELECT * FROM members_favorite where 	products_sid = ? AND members_id=?`;
  const [total] = await db.query(likeSql, [req.params.sid, req.body.id]);
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
router.post('/membersFavorite', async (req, res) => {
  const sql = `SELECT mf.*, pv.name, pv.price, pv.brandsName, pv.imgName, pv.default FROM members_favorite mf JOIN  products_view pv on pv.sid=products_sid WHERE members_id=? ORDER BY mf.created_time`;
  const [total] = await db.query(sql, [req.body.id]);
  res.json(total);
});
router.post('/list/membersFavorite', async (req, res) => {
  const sql = `SELECT mf.*, pv.name, pv.price, pv.brandsName, pv.imgName, pv.default FROM members_favorite mf JOIN  products_view pv on pv.sid=products_sid WHERE members_id=? AND products_sid=?`;
  const [total] = await db.query(sql, [req.body.id, req.body.sid]);
  res.json(total);
});
// ---------------加入收藏END----------------------

// ---------------客製化球鞋START----------------------
router.post('/customizedAdd', async (req, res) => {
  const t_sql =
    'INSERT INTO `products_customized`(`members_id`, `imgPath`) VALUES (?,?)';
  const [total] = await db.query(t_sql, [req.body.id, req.body.imgPath]);
  res.json(total);
});
router.post('/customized', async (req, res) => {
  const t_sql =
    'SELECT * FROM `products_customized` WHERE members_id=? ORDER by created_time DESC limit 0,1';
  const [total] = await db.query(t_sql, [req.body.id]);
  res.json(total);
});
router.post('/customized/addToCart', async (req, res) => {
  const sql =
    "INSERT INTO `henry_carts`(`member_id`, `order_id`, `product_id`, `quantity`, `product_size`, `product_name`, `product_category`, `product_color`, `price`, `color_id`, `stock_id`) VALUES (?,'pending',1001,1,?,'Here By You','客製化商品',?,6600,121,?)";
  const [total] = await db.query(sql, [
    req.body.id,
    req.body.size,
    req.body.color,
    req.body.sizeID,
  ]);
  res.json(total);
});
// ---------------客製化球鞋END----------------------

module.exports = router;
