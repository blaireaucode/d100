/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import classes_table from 'tables/classes_table.json'
import update from "immutability-helper"
import {v4 as uuidv4} from "uuid"
import default_game from "./default_game";
import {new_encounter} from "./helpers_encounter";
import {new_equipped_items} from "./helpers_equipment";
import table_r_race from "../tables/table_r_race.json";
import table_h_hero_path from 'tables/table_h_hero_path.json';
import {new_room} from "./helpers_dungeon";
import {new_quest} from "./helpers_quest";

export function create_new_game() {
    let new_game = JSON.parse(JSON.stringify(default_game))
    new_game.encounter = new_encounter('none');
    new_game.room = new_room(2);// FIXME
    new_game.equipped_items = new_equipped_items();
    new_game.id = uuidv4();
    new_game = update(new_game, {date: {$set: new Date()}});
    new_game.quest = new_quest(1); // FIXME
    console.log('New game', new_game);
    return new_game;
}

export function get_race(race_name) {
    let race = table_r_race[0];
    for (const r of table_r_race) {
        if (r.race === race_name) race = JSON.parse(JSON.stringify(r));
    }
    return race;
}

export function get_hero_path(hero_path) {
    let h = table_h_hero_path[0];
    for (const r of table_h_hero_path) {
        if (r.race === hero_path) h = JSON.parse(JSON.stringify(r));
    }
    return h;
}

// OLD -------------------------------------------------------

export const classes_list = Object.keys(classes_table);

export const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export const uncapitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toLowerCase() + s.slice(1)
}

export function character_add_item(character, item) {
    // make a copy before adding
    const it = JSON.parse(JSON.stringify(item));
    // random id
    it.id = uuidv4();
    // update
    return update(character, {items: {$push: [it]}});
}

export function character_rm_item(character, item) {
    const index = character.items.findIndex(litem => litem.id === item.id);
    return update(character, {items: {$splice: [[index, 1]]}});
}

