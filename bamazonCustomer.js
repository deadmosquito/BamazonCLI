var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazonDB"
});
connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});

function runSearch() {
    connection.query("SELECT * FROM products", function(err, results) {
      if (err) throw err;
      for (result of results){
        console.log("ID: "+ result.Item_ID + " Product Name: "+ result.Product_Name + " Price: $"+ result.Price );
      }
    });
  }
 function start() {
    inquirer
      .prompt([    
     {
        name: "ProductID",
        type: "list",
        message: "Which Item ID would you like to buy?",
        choices: ["1", "2", "3", "4", "5","6","7","8","9","10" ] 
      }, 
      {
        name: "purchase",
        type: "input",
        message: "How many would you like to purchase?",
      }
    ])
      .then(function(answer) {
        var item = answer.productID
        var quantity = answer.purchase
        connection.query(
            "SELECT * FROM products WHERE item_id ='" + item + "'", 
        function(err, results){
            if (err) throw err;
              for (result of results){
                if(result.stock_quantity > quantity){
                    var price = result.price*quantity
                     console.log("You're purchase is complete, thank you for your business! Your order total is $" + price);
                     var newAmount = result.stock_quantity-quantity
                     connection.query("UPDATE products SET ? WHERE Item_ID = '" + item + "'", [
                      {stock_quantity: newAmount},
          
                     ]
                      , function (err, result) {
                      if (err) throw err;
                    });

                   }else
                   {
                    console.log("oooh we're sorry but we don't have enough of that item. Please try another amount you'd like to purchase.")
                  
               }
            }
        })
    })
}