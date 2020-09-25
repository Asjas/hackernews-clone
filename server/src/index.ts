import dotenv from 'dotenv';
import 'make-promises-safe';
import createServer from './server';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;
const IP = process.env.IP || 'localhost';
const server = createServer();

async function main() {
  try {
    const address = await server.listen(PORT, IP);

    server.log.info(`Server listening on ${address}`);
    server.log.info(`GraphQL Playground is available on ${address}/playground`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

main();
