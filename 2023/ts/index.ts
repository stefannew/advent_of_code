import { DayOne } from './day-1';
import { DayTwo } from './day-2';
import { DayThree } from './day-3';
import { DayFour } from './day-4';

const days = [new DayOne, new DayTwo, new DayThree(), new DayFour()];

days.forEach(day => {
  console.log('===================');
  console.log(`Day ${day.name()}, Part 1`, day.partOne());
  console.log(`Day ${day.name()}, Part 2`, day.partTwo());
});
