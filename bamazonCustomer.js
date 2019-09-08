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
    console.log("connected as id " + connection.threadId);
    afterConnection();
});



function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (result of res) {
            console.log("ID: " + result.item_id +
                " Product Name: " + result.product_name +
                " Price: $" + result.price +
                " Amount in Stock: " + result.stock_quantity);
        }
        purchaseProducts();
    });
}
function purchaseProducts() {
    inquirer
        .prompt([
            {
                name: "ProductID",
                type: "list",
                message: "Which Item ID would you like to buy?",
                choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
            },
            {
                name: "purchase",
                type: "input",
                message: "How many would you like to purchase?",
            }
        ])
        // Ordering function
        .then(function (answer) {

            var quantity = answer.quantity;
            var itemID = answer.ProductID;

            connection.query('SELECT * FROM products WHERE item_id=' + itemID, function (err, selectedItem) {
                if (err) throw err;

                // Varify item quantity desired is in inventory
                if (selectedItem.stock_quantity - quantity >= 0) {

                    console.log("INVENTORY AUDIT: Quantity in Stock: " + selectedItem.stock_quantity + " Order Quantity: " + quantity);

                    console.log("Congratulations! Bamazon has suffiecient inventory of " + selectedItem.product_name + " to fill your order!");



                    // Calculate total sale
                    console.log("Thank You for your purchase. Your order total will be " + (answer.quantity * selectedItem.price) + " dollars.");

                    // Query to remove the purchased item from inventory.                       
                    connection.query('UPDATE products SET stock_quantity=? WHERE item_id=?', [selectedItem.stock_quantity - quantity, itemID],

                        function (err, res) {
                            if (err) throw err;

                            afterConnection();  // Runs the prompt again, so the customer can continue shopping.
                        });  // Ends the code to remove item from inventory.

                }
                else {
                    console.log("INSUFFICIENT QUANTITY: \nBamazon only has " + selectedItem[0].stock_quantity + " " + selectedItem[0].product_name + " in stock at this moment. \nPlease make another selection or reduce your quantity.");

                    afterConnection();  // Runs the prompt again, so the customer can continue shopping.
                }
            });
        });
<<<<<<< HEAD
};
=======
};
>>>>>>> 17f8d584b1cf6455def7386099773249b4081eac
