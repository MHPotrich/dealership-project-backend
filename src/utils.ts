export function getResponseNotFound(): Response {
	return new Response(null, { status: 404 });
}
