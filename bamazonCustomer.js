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
    console.log("Welcome to Bamazon!");
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
    inquirer.prompt([
        {
            name: "ProductID",
            type: "list",
            message: "What is the Id of the item you would like to buy?",
            choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
        },
        {
            name: "purchase",
            type: "input",
            message: "How many would you like to purchase?",
        }
    ])
        // Ordering function
        .then((answers) => {
            var itemID = answers.ProductID;
            var amount = parseInt(answers.purchase);

            connection.query(
                "SELECT * FROM products WHERE item_id = " + itemID,
                function (err, res) {
                    if (err) throw err;

                    for (var result of res) {
                        var quantity = parseInt(result.stock_quantity);
                        var cost = parseFloat(result.price);
                        // Calculate total sale
                        var endCost = cost * amount;
                        // Query to remove the purchased item from inventory.
                        var newAmount = quantity - amount;

                        inquirer.prompt({
                            name: "checkout",
                            type: "confirm",
                            message: "Would you like to check out?"
                        })
                            .then((answers) => {
                                if (quantity < amount) {
                                    console.log("Oops, looks like we don't have enough. There are only " + result.stock_quantity + 
                                    " in stock of the " + result.product_name + ". Sorry.");
                                    connection.end();
                                } else if (quantity > amount, answers.checkout) {
                                    console.log("Your total will be $" + endCost);
                                    inventoryUpdate(newAmount, itemID);
                                }
                            });
                    };
                });

        });
};

function inventoryUpdate(newAmount, itemID) {
    connection.query(
        "UPDATE products SET ? WHERE item_id = " + itemID,
        { stock_quantity: newAmount },
        function (err, res) {
            if (err) throw err;
            console.log("\Thanks for shopping with Bamazon!");
        });
    connection.end();
}
