import { createContext } from './trpc/context';
import { appRouter } from './trpc/router/_app';

import { BannerModule } from './modules/banner/banner.module';
import express = require('express');
/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('../medusa-config');
import { Medusa } from 'medusa-extender';
import { resolve } from 'path';
import { UserModule } from './modules/user/user.module';
import * as trpcExpress from '@trpc/server/adapters/express';

async function bootstrap() {
	const expressInstance = express();

  await new Medusa(resolve(__dirname, '..'), expressInstance).load([UserModule, BannerModule])
  expressInstance.use(
	'/trpc',
	trpcExpress.createExpressMiddleware({
	  router: appRouter,
	  createContext,
	})
  );
	expressInstance.listen(config.serverConfig.port, () => {
		console.info('Server successfully started on port ' + config.serverConfig.port);
	});
}

bootstrap();
