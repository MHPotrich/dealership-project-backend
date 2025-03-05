import {
	addBrand,
	deleteBrand,
	getBrand,
	getBrands,
	updateBrand,
} from "./controller/brand";
import { getCars } from "./controller/car";
import {
	addModel,
	deleteModel,
	getModel,
	getModels,
	updateModel,
} from "./controller/model";

const PORT = Bun.env.PORT || 3000;

Bun.serve({
	port: PORT,
	routes: {
		"/cars": {
			GET: getCars,
			POST: (request) => new Response(null, { status: 200 }),
		},
		"/cars/:id": {
			GET: (request) => new Response(null, { status: 200 }),
			PUT: (request) => new Response(null, { status: 200 }),
			DELETE: (request) => new Response(null, { status: 200 }),
		},
		"/users": {
			POST: (request) => new Response(null, { status: 200 }),
		},
		"/users/:id": {
			GET: (request) => new Response(null, { status: 200 }),
			PUT: (request) => new Response(null, { status: 200 }),
			DELETE: (request) => new Response(null, { status: 200 }),
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
