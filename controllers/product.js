var express = require('express');
var router = express.Router();

/// --- Code CONTROLLERs
router.use(function timeLog (req, res, next) {
    console.log('\n\t Product controller - Time: ', Date.now());
    next();
})

const dbname = 'shop';
const uri = 'mongodb+srv://JurgnrmEZ2CkI8LA:JurgnrmEZ2CkI8LA@cluster0.mbk03.mongodb.net/<dbname>?retryWrites=true&w=majority';
/// ..................................................
router.get('/product', productPage);

function productPage(req, res) {
    
    if (session.user) 
    {
        MongoClient.connect(urldb, { useUnifiedTopology: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("shop");
            dbo.collection("product").find({}).toArray(function(err, productlist) {
              if (err) throw err;
              
                res.render("pages/product-list",  {
                    title: "ATN-Shop PRODUCT page", 
                    username: session.user.username,
                    products : productlist 
                    , configHeader: configHeader , currpage: "Product"
                    });
                console.log('Found:', productlist);

              db.close();
            });
          });
                    

        
    } else {
        res.redirect('/login');
    }    
    console.log("\n\t ... connect PRODUCT from ", req.connection.remoteAddress, req.headers.host);
}


/// ..................................................
router.get('/list', listProductPage);
function listProductPage(req, res) {
    res.send('PRODUCT: list PRODUCT page');
}

/// --- EXports
module.exports = router;


/*

/// ..................................................
app.get('/product', productPage);
function productPage(req, res) {
    
    if (session.user) 
    {
        MongoClient.connect(urldb, { useUnifiedTopology: true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("newshop");
            dbo.collection("product").find({}).toArray(function(err, productlist) {
              if (err) throw err;
              
                res.render("pages/product-list",  {
                    title: "ATN-Shop PRODUCT page", 
                    username: session.user.username,
                    products : productlist 
                    , configHeader: configHeader , currpage: "Product"
                    });
                console.log('Found:', productlist);

              db.close();
            });
          });
                    

        
    } else {
        res.redirect('/login');
    }    
    console.log("\n\t ... connect PRODUCT from ", req.connection.remoteAddress, req.headers.host);
}


*/