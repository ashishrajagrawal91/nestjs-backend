# Nestjs Backend Service

### To setup in local

* Install node js (v14.16.0+)
* Run: `git clone https://github.com/ashishrajagrawal91/nestjs-backend.git`
* Run: `npm install`
* Run: `npm run start:develop`

### To run eslint and fix error

* Run: `npm run lint`


### API Details

#### Create User
http://localhost:3000/user
#### Method
POST
#### Request Body
| Input | Type | Required |
| --- | ----------- | ----------- |
| fullName | Text | Required |
| address | Object | Required |
| numberOfRides | Number | Required |
| avgRating | Number | Required |
```json
{
  "fullName": "Anastassia Shepherdson",
  "address": {
      "coordinates": [
          2.3508225,
          48.7700185
      ],
  },
  "numberOfRides": 97,
  "avgRating": 3.8,
}
```
#### Request Header
- application/json
#### Response
```json
{
  "message": "User has been created successfully",
  "user": {
      "fullName": "Anastassia Shepherdson",
      "address": {
          "coordinates": [
              2.3508225,
              48.7700185
          ],
          "_id": "62b8b116c2626315bca02a18"
      },
      "numberOfRides": 97,
      "avgRating": 3.8,
      "driver": "62b8354830c1a836e3571ae8",
      "_id": "62b8b116c2626315bca02a17",
      "__v": 0
  }
}
```

#### Update User
http://localhost:3000/user/62b8b116c2626315bca02a17
#### Method
PUT
#### Request Body
| Input | Type | Required |
| --- | ----------- | ----------- |
| fullName | Text | Optional |
| address | Object | Optional |
| numberOfRides | Number | Optional |
| avgRating | Number | Optional |
```json
{
    "fullName" : "Carolus Boddis",
    "address" : {
        "coordinates" : [109.592921, 27.950753]
    },
    "numberOfRides" : 50,
    "avgRating" : 3.6
}
```
#### Request Header
- application/json
#### Response
```json
{
    "message": "User has been successfully updated",
    "user": {
        "_id": "62b8b116c2626315bca02a17",
        "fullName": "Carolus Boddis",
        "address": {
            "coordinates": [
                109.592921,
                27.950753
            ],
            "_id": "62b8b5a4a85b1f7434caf9aa"
        },
        "numberOfRides": 50,
        "avgRating": 3.6,
        "driver": "62b8354830c1a836e3571ae8",
        "__v": 0
    }
}
```

#### Get a User
http://localhost:3000/user/62b8b116c2626315bca02a17
#### Method
GET
#### Request Header
- application/json
#### Response
```json
{
    "message": "User found successfully",
    "user": {
        "_id": "62b8b116c2626315bca02a17",
        "fullName": "Carolus Boddis",
        "address": {
            "coordinates": [
                109.592921,
                27.950753
            ],
            "_id": "62b8b5a4a85b1f7434caf9aa"
        },
        "numberOfRides": 50,
        "avgRating": 3.6,
        "driver": "62b8354830c1a836e3571ae8",
        "__v": 0
    }
}
```

#### Delete a User
http://localhost:3000/user/62b8b116c2626315bca02a17
#### Method
DELETE
#### Request Header
- application/json
#### Response
```json
{
    "message": "User deleted successfully"
}
```


### Response Codes 

#### Response Codes
```
201: Resource Created
200: Success
400: Bad request
```

#### Example Error Message
```json
http code 400
{
    "statusCode": 400,
    "message": [
        "fullName must be shorter than or equal to 30 characters"
    ],
    "error": "Bad Request"
}
```


### CLI Program

### To run cli
* Run: `npm run boat-cli`

### Commands for cli
* To get all customers `customer`
* To get all drivers `driver`
* List of customer and assigned Driver/List of failed fulfilment customers/List of idle drivers `match`
* Help `manual`
* Exit cli `exit`
