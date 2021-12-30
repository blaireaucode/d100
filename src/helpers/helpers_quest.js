/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import quests_table from 'tables/table_q_quests.json'
import {v4 as uuidv4} from "uuid"
import update from "immutability-helper"
import {get_table_element} from "./helpers_table";
import {new_dungeon} from "./helpers_dungeon";

export function new_quest(id = 'none') {
    const q = get_table_element(quests_table, id);
    q["id"] = uuidv4();
    q["dungeon"] = new_dungeon()
    return q;
}

export function get_img() { // FIXME TODO later
    const img = require('../images/dungeon.png').default;
    return img;
}

const direction_names = {'S': 'South', 'E': 'East', 'N': 'North', 'W': 'West'};

export function map_dir(a) {
    return a.map(e => {
        return direction_names[e] + ' ';
    });
}

export function rotate_g_quest(game) {
    if (game.quest.d100 === 'none') return game;
    const r = game.quest.rotation + 90;
    let g = update(game, {quest: {rotation: {$set: r}}});
    const ex = g.quest.exits.map(e => {
        if (e === 'S') return 'W';
        if (e === 'E') return 'S';
        if (e === 'N') return 'E';
        return 'N';
    });
    const dd = g.quest.doors_direction.map(e => {
        if (e === 'S') return 'W';
        if (e === 'E') return 'S';
        if (e === 'N') return 'E';
        return 'N';
    });
    g = update(g, {quest: {exits: {$set: ex}}});
    g = update(g, {quest: {doors_direction: {$set: dd}}});
    return g;
}

export function update_g_quest(game, quest) {
    return update(game,
        {quest: {$set: quest}});
}

