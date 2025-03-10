# dealership-project-backend
Service created to manage a dealership builded with Bun and SQLite.

## Database tables 

### Brand:
|----------------------------------|
| Name | Type | Required | Primary |
|----------------------------------|
| id | `INTEGER` | true | true |
| name | `TEXT` | true | false |
|----------------------------|

### Model:
|-|
| Name | Type | Required | Primary |
|-|
| id | `INTEGER` | true | true |
| name | `TEXT` | true | false |
| brand | `INTEGER` - brand id | true | false |
| year | `INTEGER` | true | false |
| transmission | `TEXT` | true | false |
| drivetrain | `TEXT` | true | false |
| engine | `TEXT` | true | false |
| vin | `TEXT` | true | false |
| doors | `INTEGER` | true | false |
| seating | `INTEGER` | true | false |
| horse_power | `INTEGER` | true | false |
|-|

### Car:
|-|
| Name | Type | Required | Primary |
|-|
| id | `INTEGER` | true | true |
| list_price | `NUMERIC` | true | false |
| sale_price | `NUMERIC` | false | false |
| in_stock | `BOOLEAN` | true | false |
| model | `INTEGER` - model id | true | false |
| travelled_distance | `INTEGER` | false | false |
| exterior_color | `TEXT` | true | false |
| interior_color | `TEXT` | true | false |
|-|

### User:
|-|
| Name | Type | Required | Primary |
|-|
| id | `INTEGER` | true | true |
| first_name | `TEXT` | true | false |
| last_name | `TEXT` | true | false |
| cars | `INTEGER` - car id | true | false |
| email | `TEXT` | true | false |
| password | `TEXT` | true | false |
|-|
