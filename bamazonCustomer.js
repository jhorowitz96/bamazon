var mysql = require("mysql");
var inquirer = require("inquirer");
var columnify = require('columnify')


var connection = mysql.createConnection({
    host: "localhost",


    port: 3306,


    user: "root",

    // Your password
    password: "Shakur96!",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
});

// var database = [];
function readProducts() {
    console.log("Selecting all bamazon products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(columnify(res, { columnSplitter: " | " }));
        connection.end();
    });
}



function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT item_id, product_name, department_name, price FROM products", function (err, res) {
        if (err) throw err;
        console.log("connected as id " + connection.threadId);
        // Log all results of the SELECT statement
        console.log(columnify(res, { columnSplitter: " | " }));

        inquirer.prompt([
            {
                type: "input",
                message: "Welcome to Bamazon. What is your name?",
                name: "username"
            },
            {
                type: "list",
                name: "choiceID",
                message: "What product ID do you want to buy?",
                choices: ["20", "21", "23", "28", "32", "36", "44", "46", "52", "57"],
            },
            {
                type: "input",
                name: "quantity",
                message: "How many units do you want to buy?"
            },
            {
                type: "confirm",
                message: "Are you sure:",
                name: "confirm",
                default: true
            },
        ]).then(function (response) {
            if (response.confirm) {
                console.log("Thank you for confirming, " + response.username + ".");
                console.log("Checking inventory...\n");
                var query = "SELECT * FROM products WHERE ?";
                connection.query(query, { item_id: response.choiceID }, function (err, res) {
                    if (err) throw err;
                    // Log all results of the SELECT statement
                    console.log(res);
                    // console.log(response);
                    var price = res[0].price;
                    // console.log(price);
                    var quantity = res[0].stock_quantity;
                    // console.log(quantity);
                    var checkQuantity = checkStock(response.quantity, res[0].stock_quantity);
                    console.log("checkQuantity", checkQuantity);
                    if (checkQuantity === true) {
                        var totalCost = response.quantity * res[0].price;
                        console.log("Your total cost is $" + totalCost + ".")
                        updateProduct(response.quantity, res[0].stock_quantity, response.choiceID);
                    }
                    else {
                        console.log("Insufficient Quantity. Feel free to browse the store for something else.")
                    }
                    connection.end();
                })
            }

            else {
                console.log("\nThat's okay " + response.username + ", maybe next time.\n");
                readProducts();
            }


        });

    });

    function checkStock(userQuantity, stockQuantity) {
        if (stockQuantity === 0 || userQuantity > stockQuantity) {
            return false;
        }
        else { return true }
    }

    function updateProduct(userQuantity, stockQuantity, choiceID) {
        console.log("Updating all bamazon product quantities...\n");
        connection.query(
            "UPDATE products SET ? WHERE ?",
            [
                {

                    stock_quantity: stockQuantity - userQuantity
                },
                {
                    item_id: choiceID
                }
            ],
            function (err, res) {
                if (err) {
                    console.log(err)

                }
                else {
                    console.log("products have been updated!\n");
                }
            }
        );
    }



}

readProducts();


    // function updateProduct() {
    //     console.log("Updating all quantities...\n");
    //     var query = connection.query(
    //       "UPDATE products SET ? WHERE ?",
    //       [
    //         {
    //           quantity: response.quantity
    //         },
    //       ],
    //       function(err, res) {
    //         console.log(res.affectedRows + " products updated!\n");
    //         
    //        
    //       }




// function customerQuestions() {
//     inquirer
//         .prompt({
//             name: "action",
//             type: "input",
//             message: "What is the ID of the product you'd like to by?", 
//             validate: function(value) {
//                 if (isNaN(value) === false) {
//                   return true;
//                 }
//                 return false;
//               }
//             })

//         .then(function (answer) {
//             var query = "SELECT item_id, product_name, price FROM products WHERE ?";
//             connection.query(query, [answer.action], function (err, res) {
//                 // for (var i = 0; i < res.length; i++) {
//                     console.log("Item_ID: " + answer.item_id);
//             // }
//             });
//         });
// }

// customerQuestions();