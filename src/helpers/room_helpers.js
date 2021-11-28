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

export function new_room(id = 'none') {
    // get the room
    let found = false;
    let i;
    id = id.toString()
    for (i in rooms_table) {
        const d100 = rooms_table[i].d100.toString();
        if (d100 === id) {
            found = true;
            break;
        }
    }
    if (!found) {
        console.log('ERROR : cannot find id ', id);
        i = 1;
    }
    let e = JSON.parse(JSON.stringify(rooms_table[i]));
    if (id === "none") {
        e["id"] = "none";
    } else {
        e["id"] = uuidv4();
        e["rotation"] = 0;
        e["src"] = require('../images/' + id + '.png').default;
        if (!("doors_direction" in e)) e["doors_direction"] = [];
    }
    return e;
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