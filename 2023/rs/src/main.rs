mod utils;
mod day_one;
mod day_two;

fn main() {
    let d1p1 = day_one::part_one();
    let d1p2 = day_one::part_two();

    println!("Day One, Part One: {d1p1}");
    println!("Day One, Part Two: {d1p2}");

    let d2p1 = day_two::part_one();
    let d2p2 = day_two::part_two();
    println!("Day Two, Part One: {d2p1}");
    println!("Day Two, Part Two: {d2p2}");
}

