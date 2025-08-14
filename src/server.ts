import { server } from "./app.ts";

server.listen({ port: 3333 }).then(() => {
	// biome-ignore lint/suspicious/noConsole: start server
	console.log("HTTP server running!");
});
