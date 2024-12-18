import { configure } from './config';

const config = configure();

if (!process.argv[2] || !process.argv[3]) {
  throw new Error('Invalid arguments. Supply a year and day.');
}

const year = parseInt(process.argv[2]);
const day = parseInt(process.argv[3]);

async function run() {
  const file = require(`./${year}/day-${day}.ts`);
  const d = new file.default(config);

  await d.initialize();

  const partOneResult = await d.part1();
  const partTwoResult = await d.part2();

  console.log(`Year: ${year}, Day: ${day}`);
  console.log('----------------------------------------');
  console.log(`Part One: ${partOneResult}`);
  console.log(`Part Two: ${partTwoResult}`);
  console.log('----------------------------------------');
  console.log('\n');
}

void run();
