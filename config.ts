import rc from 'rc';

export type Config = {
	session: string;
};

export function configure() {
	return rc('advent_of_code', {}) as unknown as Config;
}
