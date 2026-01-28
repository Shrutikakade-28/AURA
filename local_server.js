const http = require('http');
const fs = require('fs');
const path = require('path');

const HOST = '127.0.0.1';
const PORT = 5173;
const ROOT = process.cwd();
const DEFAULT_FILE = 'aura-complete.html';

const MIME_TYPES = {
	'.html': 'text/html; charset=utf-8',
	'.htm': 'text/html; charset=utf-8',
	'.js': 'application/javascript; charset=utf-8',
	'.mjs': 'application/javascript; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.gif': 'image/gif',
	'.svg': 'image/svg+xml',
	'.ico': 'image/x-icon',
	'.txt': 'text/plain; charset=utf-8',
};

function send(res, status, body, headers = {}) {
	res.writeHead(status, {
		'Content-Type': 'text/plain; charset=utf-8',
		'Access-Control-Allow-Origin': '*',
		...headers,
	});
	res.end(body);
}

const server = http.createServer((req, res) => {
	try {
		let urlPath = decodeURIComponent(new URL(req.url, `http://${req.headers.host}`).pathname);
		if (urlPath === '/' || urlPath === '') {
			urlPath = `/${DEFAULT_FILE}`;
		}

		// Prevent path traversal
		const safePath = path.normalize(urlPath).replace(/^\.+/, '');
		const filePath = path.join(ROOT, safePath);

		if (!filePath.startsWith(ROOT)) {
			return send(res, 403, 'Forbidden');
		}

		fs.stat(filePath, (err, stats) => {
			if (err || !stats.isFile()) {
				return send(res, 404, 'Not Found');
			}

			const ext = path.extname(filePath).toLowerCase();
			const contentType = MIME_TYPES[ext] || 'application/octet-stream';

			res.writeHead(200, {
				'Content-Type': contentType,
				'Access-Control-Allow-Origin': '*',
				'Cache-Control': 'no-cache',
			});

			const stream = fs.createReadStream(filePath);
			stream.on('error', () => send(res, 500, 'Internal Server Error'));
			stream.pipe(res);
		});
	} catch (e) {
		send(res, 500, 'Internal Server Error');
	}
});

server.listen(PORT, HOST, () => {
	console.log(`Static server running at http://${localhost}:${PORT}/`);
});

