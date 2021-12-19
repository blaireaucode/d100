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

export function empty_room() {
    return {
        id: 'empty',
        rotation: 0,
        src: require('../images/0.png').default,
        doors_direction: []
    }
}

export function new_dungeon() {
    return {last_room: 'none', rooms: []}
}

export function dungeon_create_empty(size) {
    let d = [];
    for (let row = 0; row < size[0]; row++) {
        d[row] = [];
        for (let col = 0; col < size[1]; col++)
            d[row][col] = empty_room();
    }
    return d;
}

export function dungeon_copy_at(output, input, at) {
    // at 0,0 or 0,1 or 1,0
    const size = [output.length, output[0].length];
    console.log('copy output', output);
    console.log('copy input', input);
    console.log('copy at', at);
    for (let row = 0; row < size[0]; row++) {
        for (let col = 0; col < size[1]; col++) {
            try {
                output[row][col] = JSON.parse(JSON.stringify(input[row + at[0]][col + at[1]]));
            } catch (exception) {
                output[row][col] = empty_room();
            }
        }
    }
    return output;
}

export function add_room_to_dungeon(game, direction) {
    console.log('add room room', game.room);
    console.log('add room dung', game.quest.dungeon, direction);
    const last = game.quest.dungeon.last_room;
    const rooms = game.quest.dungeon.rooms;
    let r = '';
    let index = [last[0], last[1]];

    if (last === 'none') {
        r = [[JSON.parse(JSON.stringify(game.room))]];
        index = [0, 0];
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
        console.log('size ', size);
        console.log('last', last);
        console.log('index', index);
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
            console.log('new size ', newsize);
            console.log('new at', at);
            console.log('new index', index);
            r = dungeon_create_empty(newsize);
            console.log("empty r", r);
            r = dungeon_copy_at(r, rooms, at);
        } else {
            r = JSON.parse(JSON.stringify(rooms));
        }
        console.log("r", r);
        // set new room
        r[index[0]][index[1]] = JSON.parse(JSON.stringify(game.room));
    }
    console.log("r", r);
    let g = update(game, {quest: {dungeon: {last_room: {$set: index}}}});
    g = update(g, {quest: {dungeon: {rooms: {$set: r}}}});
    console.log('d', g.quest.dungeon)
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