import { DayOne } from './day-1';
import { DayTwo } from './day-2';
import { DayThree } from './day-3';
import { DayFour } from './day-4';
import { DayFive } from './day-5';

const days = [new DayFive()];

days.forEach(day => {
  console.log('===================');
  console.log(`Day ${day.name()}, Part 1`, day.partOne());
  console.log(`Day ${day.name()}, Part 2`, day.partTwo());
});
