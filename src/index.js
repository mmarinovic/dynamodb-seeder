const AWS = require("aws-sdk");
const fs = require('fs');
const commandLineArgs = require('command-line-args');

const options = commandLineArgs([
    { name: 'table', type: String, defaultOption: true },
])

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing into DynamoDB. Please wait.");
console.log(options.table)
var items = JSON.parse(fs.readFileSync('seed.json', 'utf8'));
items.forEach(function(item) {
    var params = {
        TableName: options.table,
        Item: item
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("Succeeded");
       }
    });
});