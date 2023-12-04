use std::collections::HashMap;
use std::fmt;
use std::fmt::Display;
use std::hash::Hash;
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

pub fn part_two() -> i32 {
    let lines: Vec<String> = lines_from_file("../inputs/2.txt");
    let mut games: Vec<Game> = vec![];

    for line in lines {
        let game = parse_game(line);
        games.push(game);
    }

    let power_of_required_colours_per_game: Vec<i32> = games.iter().map(|game| {
        let green = game.lowest_required_colours.get("green").unwrap();
        let red = game.lowest_required_colours.get("red").unwrap();
        let blue = game.lowest_required_colours.get("blue").unwrap();

        green * red * blue
    }).collect();

    power_of_required_colours_per_game.iter().fold(0, |acc, curr| {
        acc + curr
    })
}

#[derive(Clone)]
struct Game {
    number: i32,
    sets: Vec<HashMap<String, i32>>,
    lowest_required_colours: HashMap<String, i32>
}

impl Display for Game {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{} {:?} {:?}", self.number, self.sets, self.lowest_required_colours)
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
    let sets = create_set_map(trimmed_sets);

    Game {
        number,
        sets: sets.clone(),
        lowest_required_colours: create_lowest_required_colours_map(sets)
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

fn create_lowest_required_colours_map(sets: Vec<HashMap<String, i32>>) -> HashMap<String, i32> {
    let default_required_colours = HashMap::from([
        (String::from("green"), 0),
        (String::from("red"), 0),
        (String::from("blue"), 0)
    ]);

    sets.iter().fold(default_required_colours, |mut acc, curr| {
        for (k, v) in curr {
            if (acc[k] < *v) {
                acc.insert(k.to_string(), *v);
            }
        }
        acc
    })
}