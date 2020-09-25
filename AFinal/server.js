var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

var userData = require('./userData');
var clothesData = require('./clothes');
var stickersData = require('./stickers');

//console.log("user data", userData["Hello"].cart[0].likes);

var app = express();
var port = process.env.PORT || 3000;

//since the landing page didn't have the navbar it wasn't included as the main template
app.engine('handlebars', exphbs({ defaultLayout: null}));
app.set('view engine', 'handlebars');

//if the user doesn't sign in they will automatically be assumed to be a guest
var curUser = "guest";

app.use(bodyParser.json());
app.use(express.static('public'));

//If the user enters in the root path then they will be sent to the landing page to login or continue as a guest
app.get('/', function (req, res, next) {
    curUser = "guest";
    res.status(200).sendFile(path.join(__dirname, 'public', 'landing.html'));
});

app.get('/landing.html', function (req, res, next) {
    curUser = "guest";
    res.status(200).sendFile(path.join(__dirname, 'public', 'landing.html'));
});

app.get('/mainShop.html', function(req, res, next) {
    //console.log("enter main shop go");
    var randomArr = [];

    var randomSticker = Math.floor(Math.random() * (stickersData.length-1));
    var randomClothe = Math.floor(Math.random() * (clothesData.length-1));

    //This block of if else statements essentially picks one random elements from each category
    //along with the item before or after it depending on which random number was generated
    if (randomSticker != (stickersData.length-1)) {
        randomArr.push(stickersData[randomSticker]);
        randomArr.push(stickersData[randomSticker+1]);
    } else {
        randomArr.push(stickersData[randomSticker]);
        randomArr.push(stickersData[randomSticker-1]);
    }

    if (randomClothe != (clothesData.length-1)) {
        randomArr.push(clothesData[randomClothe]);
        randomArr.push(clothesData[randomClothe+1]);
    } else {
        randomArr.push(clothesData[randomClothe]);
        randomArr.push(clothesData[randomClothe-1]);
    }
    res.status(200).render('shopPage', {message: "Welcome to the Home Page", shopList: randomArr});
});

app.get('/stickers.html', function(req, res, next) {
    //console.log("enter stickers shop");
    res.status(200).render('shopPage', {message: "Stickers", shopList: stickersData});
});

app.get('/clothes.html', function(req, res, next) {
    //console.log("enter clothes shop");
    res.status(200).render('shopPage', {message: "Clothes", shopList: clothesData});
});

//Want to change this to a post function so that if they try to view the cart when they are a guest it alerts them that they 
//cant do that
app.get('/viewCart', function(req, res, next) {
    if(curUser == "guest") {
        res.status(200).render('cartPage', {message: "Cart empty, guests cannot have a cart"})
    } else {
        var runningTotal = 0;
        for (i = 0; i < userData[curUser].cart.length; i++) {
            var costStr = userData[curUser].cart[i].price;
            //costStr.replace('$', ' ');
            //console.log("cost", costStr);
            runningTotal += parseFloat(costStr.substring(1));
        }
        runningTotal = runningTotal.toFixed(2);
        res.status(200).render('cartPage', {message: (curUser + "'s cart"), cartItem: userData[curUser].cart, totalCost: ("Your total cost is $" + runningTotal)});
    }
});

//post request that checks if a user has data stored in memory aka the json file
app.post('/login', function(req,res) {
    if(userData[req.body.name]){
        curUser = req.body.name;
        res.status(200).send("User Exists");
    }
    else{
        res.status(204).send("User Does Not Exist");
    }
});

app.post('/likeItem/:site/:index', function(req,res) {
    var itemIndex = req.params.index;
    var siteName = req.params.site;

    if (siteName == "stickers") {
        stickersData[itemIndex].likes += 1;
        res.status(200).send();
    } else if (siteName == "clothes") {
        clothesData[itemIndex].likes += 1;
        res.status(200).send();
    } else {
        //console.log("can't like items from the home page");
        res.status(400).send("Can't like item from home page");
    }

});

app.post('/addItem/:site/:index', function(req,res) {
    var itemIndex = req.params.index;
    var siteName = req.params.site;

    if (curUser != "guest") {
        if (siteName == "stickers") {
            userData[curUser].cart.push(stickersData[itemIndex]);
        } else if (siteName == "clothes") {
            userData[curUser].cart.push(clothesData[itemIndex]);
        } else {
            //console.log("can't add items from the home page");
            res.status(400).send("Can't like item from home page");
        }
    } else {
        //console.log("guests can't add items to their cart")
        res.status(401).send("Can't like item from home page");
    }
});

//Decided to make a template for the cart page and for the 404 page. This is becuase they 
//both don't use the navbar like the other sites so I decided it might be cleaner to comnine them 
//This makes it so that there are less actual html pages to deal with for the server
app.get('*', function (req, res) {
    res.status(404).render('cartPage', {message: "Error 404, could not find that page"});
});

app.listen(port, function () {
    console.log("Server is listening on port", port);
});
