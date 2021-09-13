var express = require('express');
var router = express.Router();
var pg_conn = require('../models/pg_config');

/* GET users page . */
router.get('/', async function(req, res) {
  var shop_name = req.params.shop_name;
  var product_query = {
      text: 'select * from product',
      values: []
  };
  var data = await pg_conn.query(product_query);
  res.render('users_fe', {
      title: "Shop ",
      h1_title: "Welcome to ATN shop page",
      h2_title: "Fetch data table by EJS",
      userData: data
  });
});
  

/* GET EDIT page */
router.get('/edit/:name', function(req, res) {
  var prod_name = req.params.name;
  const edit_query = {
      text: "SELECT * FROM product WHERE product_name=$1",
      values: [prod_name]
  };
  pg_conn.query(edit_query, function(err, data) {
      if (err) throw err;
      res.render('edit_form', { title: "Edit page", edit_data: data.rows[0] });
  });
});
/* POST from the edit_form submision */
router.post('/edit/:name', function(req, res){
  var prod_name = req.params.name;
  const update_query = {
    text: "UPDATE product SET product_name=$1, price=$2, amount=$3, shop_name=$4, product_id=$5 WHERE product_name=$6",
    values: [req.body.product_name, req.body.price, req.body.amount, req.body.shop_name,  req.body.product_id, prod_name]
  };
  pg_conn.query(update_query, function(err, data){
    if (err) {
      throw err;
      res.render('error', {message: "Update got an error", error: err});
    
    } else {
      var produc_query = 'SELECT * FROM product';
      pg_conn.query(produc_query, function(err, data){
        //console.log(data);
        // res.render('users_fe', {title: "Userpage",
        //                         h1_title: "Welcome to ATN shop page",
        //                         h2_title: "Updated database sucessfully",
        //                         userData: data});
        res.redirect('users');
      });
    };
  });
}
);
router.get('/insert', function(req, res) {
res.render('insert_form', {title: "Insert new recort  page"});
});
router.post('/insert', function(req, res){
  var prod_name = req.params.name;
  const insert_query = {
    text: "INSERT INTO product VALUES ($1,$2,$3,$4,$5)",
    values: [req.body.product_name, req.body.price, req.body.amount, req.body.shop_name,req.body.product_id]
  };
  pg_conn.query(insert_query, function(err, data){
    if (err) {
      throw err;
      res.render('error', { message: "Insert got error", error: err })
  } else {
      var product_query = 'SELECT * FROM product';
      pg_conn.query(product_query, function(err, data) {
          /*  res.render('users_fe', {
                title: "Welcome to ATN shop Page",
                h1_title: "Welcome to DPCB shop Page",
                h2_title: "Update query database successfully",
                userData: data 
            });*/
          res.redirect('/users')
      });
  };
  });
}
);
router.get('/delete/:name', function(req, res) {
  var prod_id = req.params.name;
  const del_query = {
      text: "DELETE FROM product WHERE product_name=$1",
      values: [prod_id]
  };
  pg_conn.query(del_query, function(err, data) {
      if (err) {
          throw err;
          res.render('error', { message: "DELETE got error", error: err })
      } else {
          var product_query = 'SELECT * FROM product';
          pg_conn.query(product_query, function(err, data) {
              /*  res.render('users_fe', {
                    title: "Welcome to ATN shop Page",
                    h1_title: "Welcome to DPCB shop Page",
                    h2_title: "DELETE query database successfully",
                    userData: data
                });*/
              res.redirect('/users')
          });
      };
  });
});
module.exports = router;
