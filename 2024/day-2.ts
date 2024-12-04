import { ISolution, Solution } from '../solution';
import { Config } from '../config';

export default class Day2 extends Solution implements ISolution {
  constructor(config: Config, override?: string) {
    super(2024, 2, config, override);
  }

  async part1() {
    const safeReports = this.lines
      .map(line => line.split(' ').map(value => parseInt(value)))
      .filter(this.isSafeReport);

    return safeReports.length;
  }

  private isSafeReport(report: number[]) {
    let safeDifference = true;
    const signs: number[] = [];

    for (let i = 0; i < report.length - 1; i++) {
      const difference = report[i + 1] - report[i];
      signs.push(Math.sign(difference));

      if (Math.abs(difference) < 1 || Math.abs(difference) > 3) {
        safeDifference = false;
      }
    }

    const allSameDirection = new Set(signs).size === 1

    return safeDifference && allSameDirection;
  }

  private createReportWithSkips(baseReportIndex: number, report: number[]) {
    const reports = [];
    let i = 0;

    while (i < report.length) {
      const reportCopy = report.slice();
      reportCopy.splice(i, 1);
      reports.push(reportCopy);
      i++;
    }

    return { baseReportIndex, reports };
  }

  async part2() {
    const reportTracker: Record<number, number[][]> = {};
    const reports = this.lines.map(line => line.split(' ').map(value => parseInt(value)));
    const reportsWithSkips = reports.flatMap((report, index) => this.createReportWithSkips(index, report));

    reportsWithSkips.forEach(({ baseReportIndex, reports }) => {
      reportTracker[baseReportIndex] = reports.filter(report => this.isSafeReport(report));
    });

    return Object.values(reportTracker).reduce((acc, curr) => {
      if (curr.length > 0) {
        acc += 1;
      }

      return acc;
    }, 0);
  }
}
