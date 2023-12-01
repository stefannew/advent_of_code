use std::{
    fs::File,
    io::{prelude::*, BufReader},
    path::Path,
};

pub fn lines_from_file(filename: impl AsRef<Path>) -> Vec<String> {
    let file = File::open(filename).expect("file {filename} not found");
    let buffer = BufReader::new(file);

    buffer.lines()
        .map(|l| l.expect("Could not parse line"))
        .collect()
}

pub fn u32_vector_concat(first: &u32, second: &u32) -> i32 {
    let str = format!("{}{}", first, second);
    let number = match str.parse::<i32>() {
        Ok(n) => n,
        _ => -1 // I don't know how else to handle this `expected i32, got ()`
    };

    return number;
}