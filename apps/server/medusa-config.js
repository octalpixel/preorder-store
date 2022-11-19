const dotenv = require('dotenv');

let ENV_FILE_NAME = '';
switch (process.env.NODE_ENV) {
	case 'production':
		ENV_FILE_NAME = '.env';
		break;
	case 'test':
		ENV_FILE_NAME = '.env.test';
		break;
	default:
		ENV_FILE_NAME = '.env';
		break;
}

dotenv.config({ path: process.cwd() + '/' + ENV_FILE_NAME });

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const PORT = process.env.PORT || 3000;
// CORS when consuming Medusa from admin
const ADMIN_CORS = process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000,http://localhost:8001,http://localhost:8002";

const plugins = [
	`medusa-fulfillment-manual`,
	`medusa-payment-manual`,
];

module.exports = {
	serverConfig: {
		port: PORT,
	},
	projectConfig: {
		// redis_url: REDIS_URL,
		// For more production-like environment install PostgresQL
		jwtSecret: process.env.JWT_SECRET,
		cookieSecret: process.env.COOKIE_SECRET,

		// database_url: `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/medusa`,
		// database_url: 'postgres://postgres:Asdfgh!123456@vurjxubstslogjscxdpk.db.ap-southeast-1.nhost.run:5432/vurjxubstslogjscxdpk',
		database_url: 'postgres://postgres:123456@localhost:5432/postgres',
		database_type: 'postgres',
		store_cors: STORE_CORS,
		admin_cors: ADMIN_CORS,
		sslmode: 'require',
		// redis_url: REDIS_URL,
		cli_migration_dirs: ["dist/**/*.migration.js"]
	},
	monitoring: {
        uriPath: '/monitoring'
    },
	plugins,
};
