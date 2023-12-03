use std::collections::HashMap;
use std::str::{FromStr};
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

pub fn part_two() -> i32 {

    let lines: Vec<String> = lines_from_file("../inputs/1.txt");
    for line in lines {
        // let mut char_indices = get_number_indices(&line);
        let mut word_number_indices = get_words_as_numbers(&line);

        // println!("Char Indices:");
        // println!("{:?}", char_indices);
    }
    0
}

fn get_numbers(line: String) -> Vec<u32> {
    line
        .chars()
        .filter_map(|c| c.to_digit(10))
        .collect()
}

fn get_number_indices(line: &String) -> Vec<(usize, i32)> {
    line
        .char_indices()
        .into_iter()
        .filter_map(|(s, c)| Option::from((s, char_to_digit(&c))))
        .into_iter()
        .filter(|(s, i)| i > &-1 )
        .collect()
}

fn char_to_digit(c: &char) -> i32 {
    match c.to_digit(10) {
        Some(value) => value as i32,
        None => -1
    }
}

fn get_words_as_numbers(line: &String) -> Vec<(usize, i32)> {
    let mut indices: Vec<Vec<(usize, &str)>> = vec![];
    let lookup_number: HashMap<&str, &str> = HashMap::from([
        ("one", "1"),
        ("two", "2"),
        ("three", "3"),
        ("four", "4"),
        ("five", "5"),
        ("six", "6"),
        ("seven", "7"),
        ("eight", "8"),
        ("nine", "9"),
        ("ten", "10")
    ]);

    for (_key, value) in lookup_number.into_iter() {
        let v: Vec<_> = line.match_indices(value).collect();
        indices.push(v);
    }

    let mut flat: Vec<(usize, &str)> = indices.into_iter().flatten().collect();
    flat.sort_by(|a, b| a.partial_cmp(&b).unwrap());

    flat
        .into_iter()
        .map(|(s, c)| (s, <i32 as FromStr>::from_str(c).unwrap()))
        .collect()
}