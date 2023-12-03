use std::collections::HashMap;
use std::fmt;
use std::fmt::Display;
use crate::utils::lines_from_file;

pub fn part_one() -> i32 {
    let lines: Vec<String> = lines_from_file("../inputs/2.txt");
    let mut possible_game_ids: Vec<i32> = vec![];

    for line in lines {
        let game = parse_game(line);
        if is_possible_game(game.clone()) {
            possible_game_ids.push(game.number)
        }
    }

    possible_game_ids.iter().sum()
}

#[derive(Clone)]
struct Game {
    number: i32,
    sets: Vec<HashMap<String, i32>>
}

impl Display for Game {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{} {:?}", self.number, self.sets)
    }
}

fn parse_game(line: String) -> Game {
    let mut split = line.split(':');
    let title = split.next().expect("Unable to parse game");
    let number = title.split(' ').collect::<Vec<&str>>()[1].parse::<i32>().expect("Unable to get game number");
    let rest = split.next().expect("Unable to parse game").trim();
    let sets: Vec<&str> = rest
        .split(";")
        .collect::<Vec<&str>>()
        .try_into()
        .unwrap();

    let trimmed_sets = sets.iter().map(|x| x.trim()).collect::<Vec<&str>>();

    Game {
        number,
        sets: create_set_map(trimmed_sets)
    }
}

fn create_set_map(set: Vec<&str>) -> Vec<HashMap<String, i32>> {
    set.into_iter().map(|x| {
        let set: Vec<&str> = x.split(',').collect::<Vec<&str>>().iter().map(|x| x.trim()).collect();

        set.clone().into_iter().map(|x| {
            let parts = x.split(' ').collect::<Vec<&str>>();
            (String::from(parts[1]), parts[0].parse::<i32>().expect("Unable to parse"))
        }).collect::<HashMap<String, i32>>()
    }).collect()
}

fn is_possible_game(game: Game) -> bool {
    let constraints = HashMap::from([
        ("red", 12),
        ("green", 13),
        ("blue", 14)
    ]);

    let mut results = game.sets.iter().map(|set| {
        if set.iter().all(|(k, v)| {
            v <= &(constraints.get(&k as &str).unwrap())
        }) {
            return true
        }
        false
    });

    return results.all(|result| result == true)
}