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
import {get_table_element} from "./helpers_update";

export function new_room(id = 'none') {
    // get the room
    const e = get_table_element(rooms_table, id);
    e["search"] = {};
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

export function new_dungeon() {
    return {last_room: 'none', rooms: []}
}

export function empty_room() {
    return {
        id: 'empty',
        rotation: 0,
        src: require('../images/0.png').default,
        doors_direction: [],
        index: []
    }
}

export function new_empty_dungeon(size) {
    let d = [];
    for (let row = 0; row < size[0]; row++) {
        d[row] = [];
        for (let col = 0; col < size[1]; col++) {
            d[row][col] = empty_room();
            d[row][col].index = [row, col];
        }
    }
    return d;
}

export function dungeon_copy_at(output, input, at) {
    // at 0,0 or 0,1 or 1,0
    const size = [output.length, output[0].length];
    for (let row = 0; row < size[0]; row++) {
        for (let col = 0; col < size[1]; col++) {
            try {
                output[row][col] = JSON.parse(JSON.stringify(input[row + at[0]][col + at[1]]));
                output[row][col].index = [row, col];
            } catch (exception) {
                output[row][col] = empty_room();
                output[row][col].index = [row, col];
            }
        }
    }
    return output;
}

export function add_g_room_to_dungeon(game, direction) {
    const last = game.quest.dungeon.last_room;
    const rooms = game.quest.dungeon.rooms;
    let r = '';
    let index = [last[0], last[1]];

    if (last === 'none') {
        r = [[JSON.parse(JSON.stringify(game.room))]];
        index = [0, 0];
        r[0][0].index = index;
    } else {

        // new index according to direction
        if (direction === 'E')
            index[1] += 1;
        if (direction === 'W')
            index[1] -= 1;
        if (direction === 'N')
            index[0] -= 1;
        if (direction === 'S')
            index[0] += 1;


        const size = [rooms.length, rooms[0].length];
        // increase size ?
        if (index[0] >= size[0] || index[1] >= size[1] ||
            index[0] < 0 || index[1] < 0) {
            let at = [0, 0];
            let newsize = [size[0], size[1]];
            if (index[0] >= size[0] || index[0] < 0) {
                newsize[0] += 1;
                if (index[0] < 0) {
                    at[0] = -1;
                    index[0] = 0;
                }
            }
            if (index[1] >= size[1] || index[1] < 0) {
                newsize[1] += 1;
                if (index[1] < 0) {
                    at[1] = -1;
                    index[1] = 0;
                }
            }
            r = new_empty_dungeon(newsize);
            r = dungeon_copy_at(r, rooms, at);
        } else {
            r = JSON.parse(JSON.stringify(rooms));
        }
        // set new room
        r[index[0]][index[1]] = JSON.parse(JSON.stringify(game.room));
        r[index[0]][index[1]].index = index;
    }
    let g = update(game, {quest: {dungeon: {last_room: {$set: index}}}});
    g = update(g, {quest: {dungeon: {rooms: {$set: r}}}});
    return g;
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

export function rotate_room(room) {
    const rot = room.rotation + 90;
    let r = update(room, {rotation: {$set: rot}});
    const ex = r.exits.map(e => {
        if (e === 'S') return 'W';
        if (e === 'E') return 'S';
        if (e === 'N') return 'E';
        return 'N';
    });
    const dd = r.doors_direction.map(e => {
        if (e === 'S') return 'W';
        if (e === 'E') return 'S';
        if (e === 'N') return 'E';
        return 'N';
    });
    r = update(r, {exits: {$set: ex}});
    r = update(r, {doors_direction: {$set: dd}});
    return r;
}

export function rotate_g_room(game) {
    if (game.room.d100 === 'none') return game;
    const room = rotate_room(game.room);
    return update(game, {room: {$set: room}});
}

export function get_dungeon_room(game, index) {
    return game.quest.dungeon.rooms[index[0]][index[1]];
}

export function set_g_dungeon_room(game, index, room) {
    return update(game, {
        quest: {
            dungeon: {
                rooms: {
                    [index[0]]:
                        {[index[1]]: {$set: room}}
                }
            }
        }
    });
}

export function rotate_g_dungeon_room(game, index) {
    const room = rotate_room(get_dungeon_room(game, index));
    return set_g_dungeon_room(game, index, room);
}
