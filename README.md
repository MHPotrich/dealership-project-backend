# dealership-project-backend
Service created to manage a dealership builded with Bun and SQLite.

## Requeriments

- Bun: [Bun](https://bun.sh/)

or

- Docker: [Docker](https://www.docker.com/)

## Routes

### Brands

* Get - `/brands`:

* Post - `/brands`:

* Get - `/brands/<brand-id>`:

* Put - `/brands/<brand-id>`:

* Delete - `/brands/<brand-id>`:

### Users

* Post - `/users`:

* Get - `/users/<user-id>`:

* Put - `/users/<user-id>`:

* Delete - `/users/<user-id>`:

### Models

* Get - `/models`:

* Post - `/models`:

* Get - `/models/<model-id>`:

* Put - `/models/<model-id>`:

* Delete - `/models/<model-id>`:

### Cars

* Get - `/cars`:

* Post - `/cars`:

* Get - `/cars/<car-id>`:

* Put - `/cars/<car-id>`:

* Delete - `/cars/<car-id>`:

## Database tables 

### Brand:
| Name | Type | Required | Primary |
| ---- | ---- | -------- | ------- |
| id | `INTEGER` | true | true |
| name | `TEXT` | true | false |

### Model:
| Name | Type | Required | Primary |
| ---- | ---- | -------- | ------- |
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

### Car:
| Name | Type | Required | Primary |
| ---- | ---- | -------- | ------- |
| id | `INTEGER` | true | true |
| list_price | `NUMERIC` | true | false |
| sale_price | `NUMERIC` | false | false |
| in_stock | `BOOLEAN` | true | false |
| model | `INTEGER` - model id | true | false |
| travelled_distance | `INTEGER` | false | false |
| exterior_color | `TEXT` | true | false |
| interior_color | `TEXT` | true | false |

### User:
| Name | Type | Required | Primary |
| ---- | ---- | -------- | ------- |
| id | `INTEGER` | true | true |
| first_name | `TEXT` | true | false |
| last_name | `TEXT` | true | false |
| cars | `INTEGER` - car id | true | false |
| email | `TEXT` | true | false |
| password | `TEXT` | true | false |
