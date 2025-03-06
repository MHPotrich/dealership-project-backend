import {
	addBrand,
	deleteBrand,
	getBrand,
	getBrands,
	updateBrand,
} from "./controller/brand";
import {
	addCar,
	deleteCar,
	getCar,
	getCars,
	updateCar,
} from "./controller/car";
import {
	addModel,
	deleteModel,
	getModel,
	getModels,
	updateModel,
} from "./controller/model";
import { addUser, deleteUser, getUser, updateUser } from "./controller/user";

const PORT = Bun.env.PORT || 3000;

Bun.serve({
	port: PORT,
	routes: {
		"/cars": {
			GET: getCars,
			POST: addCar,
		},
		"/cars/:id": {
			GET: getCar,
			PUT: updateCar,
			DELETE: deleteCar,
		},
		"/users": {
			POST: addUser,
		},
		"/users/:id": {
			GET: getUser,
			PUT: updateUser,
			DELETE: deleteUser,
		},
		"/brands": {
			GET: getBrands,
			POST: addBrand,
		},
		"/brands/:id": {
			GET: getBrand,
			PUT: updateBrand,
			DELETE: deleteBrand,
		},
		"/models": {
			GET: getModels,
			POST: addModel,
		},
		"/models/:id": {
			GET: getModel,
			PUT: updateModel,
			DELETE: deleteModel,
		},
		"/*": (request) => new Response(null, { status: 404 }),
	},
});

console.log(`Server running on port ${PORT}`);
