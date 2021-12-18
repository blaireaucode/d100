/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import rooms_table from 'tables/table_m_mapping.json'
import {v4 as uuidv4} from "uuid"
import update from "immutability-helper"
import {get_table_element} from "./update_helpers";

export function new_room(id = 'none') {
    // get the room
    const e = get_table_element(rooms_table, id);
    if (id === "none") {
        e["id"] = "none";
        e["doors_direction"] = [];
        e["rotation"] = 0;
        e["src"] = '';
    } else {
        e["id"] = uuidv4();
        e["rotation"] = 0;
        e["src"] = require('../images/' + id + '.png').default;
        if (!("doors_direction" in e)) e["doors_direction"] = [];
    }
    return e;
}

export function get_img() {
    const img = require('../images/dungeon.png').default;
    return img;
}

const direction_names = {'S': 'South', 'E': 'East', 'N': 'North', 'W': 'West'};

export function map_dir(a) {
    return a.map(e => {
        return direction_names[e] + ' ';
    });
}

export function rotate_g_room(game) {
    if (game.room.d100 === 'none') return game;
    const r = game.room.rotation + 90;
    let g = update(game, {room: {rotation: {$set: r}}});
    const ex = g.room.exits.map(e => {
        if (e === 'S') return 'W';
        if (e === 'E') return 'S';
        if (e === 'N') return 'E';
        return 'N';
    });
    const dd = g.room.doors_direction.map(e => {
        if (e === 'S') return 'W';
        if (e === 'E') return 'S';
        if (e === 'N') return 'E';
        return 'N';
    });
    g = update(g, {room: {exits: {$set: ex}}});
    g = update(g, {room: {doors_direction: {$set: dd}}});
    return g;
}