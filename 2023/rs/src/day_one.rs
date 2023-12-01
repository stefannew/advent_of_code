use crate::utils::{lines_from_file, u32_vector_concat};

pub fn part_one() -> i32 {
    let lines: Vec<String> = lines_from_file("../inputs/1.txt");
    let mut numbers: Vec<i32> = vec![];

    for line in lines {
        let line_numbers = get_numbers(line);
        let first = line_numbers.first().unwrap();
        let last = line_numbers.last().unwrap();
        numbers.push(u32_vector_concat(first, last));
    }

    numbers.iter().sum()
}

fn get_numbers(line: String) -> Vec<u32> {
    line
        .chars()
        .filter_map(|c| c.to_digit(10))
        .collect()
}
