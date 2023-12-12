import { DayOne } from './day-1';
import { DayTwo } from './day-2';
import { DayThree } from './day-3';
import { DayFour } from './day-4';
import { DayFive } from './day-5';
import { DaySix } from './day-6';

const days = [new DaySix()];

days.forEach(day => {
  console.log('===================');
  console.log(`${day.name()}, Part 1`, day.partOne());
  console.log(`${day.name()}, Part 2`, day.partTwo());
});
