# mongoserve
test mongodb with node
## Remote Mongodb instance setup
- test is to perform query on DB
- also incorporate Mocha unit testing
## On MongoDB Server - Load test data
- curl "https://raw.githubusercontent.com/mongodb/docs-assets/primer-dataset/primer-dataset.json" > restaurants.json
- mongoimport --db test --collection restaurants --drop --file restaurants.json
