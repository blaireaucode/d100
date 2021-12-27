/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import weapon_table from 'tables/table_w_weapon.json';
import armour_table from 'tables/table_a_armour.json';
import needed_table from 'tables/table_n_needed.json';
import treasureA_table from 'tables/table_ta_treasure_A.json';
import parts_table from 'tables/table_p_parts.json';
import find_table from 'tables/table_f_find.json';
import {parse_d100_interval} from "./helpers_encounter";
import update from "immutability-helper";
import {v4 as uuidv4} from "uuid";
import default_item from "./default_item";
import React from "react";
import {update_g_characteristic} from "./helpers_update";

export const all_tables = {
    weapon: weapon_table,
    armour: armour_table,
    needed: needed_table,
    treasureA: treasureA_table,
    parts: parts_table,
    find: find_table
}

export function new_table_roll() {
    return {
        dice: -1,
        table: 'find',
        tables: {find: find_table},
        mod: 0,
        total: -1,
        change_table: true,
        change_mod: true,
        item: {}
    };
}

export function get_item_in_table(table_name, id, copy = true) {
    const table = all_tables[get_table_name(table_name)];
    let found = false;
    let i;
    for (i in table) {
        let d100 = '';
        let nid = id;
        if (id[0] === 'P') {// special case for parts P1 P2 P3 P4
            const k = 'P' + id[1];
            d100 = (table[i])[k];
            nid = parseInt(id.substr(2, id.length));
        } else {
            d100 = table[i].d100;
        }
        if (d100 === nid || parse_d100_interval(d100, nid)) {
            found = true;
            break;
        }
    }
    if (!found) {
        console.log('ERROR : cannot find id ', id);
        i = 1;
    }
    if (copy) {
        let item = JSON.parse(JSON.stringify(table[i]));
        item["id"] = uuidv4();
        item["current_location"] = 'backpack';
        item["damaged"] = 0;
        item["item_type"] = table_name;
        for (const k in default_item) {
            if (k in item) continue;
            item[k] = '';
        }
        return item;
    }
    return table[i];
}

export function get_items_from_table(table_name, Component, id = 'all') {
    const table = all_tables[table_name];
    let i = 0;
    let items = [];
    for (let item of table) {
        let v = item.d100;
        if (v === 'none') continue;
        if (id !== 'all' && !parse_d100_interval(v, id)) continue;
        const cn = (i % 2 === 0) ? 'item_table_odd' : 'item_table_even';
        const op = <span key={v}>
                        <Component id={v} class_name={cn}/>
                       </span>;
        items.push(op);
        i += 1;
    }
    return items;
}

export function buy_g_item(game, table_name, id, buy = true) {
    const item = get_item_in_table(table_name, id);
    let gp = item.gp;
    if (!buy) gp = 0;
    const gpt = game.characteristics.gold_pieces - gp;
    let g = update_g_characteristic(game, 'gold_pieces', gpt);
    g = update_g_add_item(g, item);
    return g;
}

export function buy_state_item(t, buy = true) {
    if (buy) t.setState({buy: 'Bought it!'});
    else t.setState({buy: 'In backpack'});
    setTimeout(() => {
        t.setState({buy: ''});
    }, 3000);
}

export function update_g_add_item(game, item) {
    return update(game, {items: {[item.id]: {$set: item}}});
}

export function update_g_remove_item(game, id) {
    return update(game, {items: {$unset: [id]}});// check total
}

export function update_g_item(game, id, fn, v) {
    game = update(game, {items: {[id]: {[fn]: {$set: v}}}});
    game = update_g_equip_total(game);
    return game;
}

export function new_equipped_items() {
    return [
        {d10: 1, dmg_mod: "+3", location: 'Head', item_id: 'none'},
        {d10: 2, dmg_mod: "+2", location: 'Back', item_id: 'none'},
        {d10: 3, dmg_mod: "+1", location: 'Torso', item_id: 'none'},
        {d10: 4, dmg_mod: "-", location: 'Arms', item_id: 'none'},
        {d10: 5, dmg_mod: "-", location: 'Hands', item_id: 'none'},
        {d10: 6, dmg_mod: "-", location: 'Main H', item_id: 'none'},
        {d10: 7, dmg_mod: "-", location: 'Off H', item_id: 'none'},
        {d10: 8, dmg_mod: "BC", location: 'Waist', item_id: 'none'},
        {d10: 9, dmg_mod: "-1", location: 'Legs', item_id: 'none'},
        {d10: 10, dmg_mod: "-1", location: 'Feet', item_id: 'none'},
        {d10: 11, dmg_mod: "", location: 'Neck', item_id: 'none'},
        {d10: 12, dmg_mod: "", location: 'Ring', item_id: 'none'},
        {d10: 13, dmg_mod: "", location: 'Ring', item_id: 'none'}
    ];
}

export function update_g_equip_item(game, id) {
    if (!(id in game.items)) {
        console.log('Error item not found', id, game.items);
        return game;
    }
    const item = game.items[id];
    if (item.item_type === 'weapon') game = update_g_equip_weapon(game, item);
    if (item.item_type === 'armour') game = update_g_equip_armour(game, item);

    // check total
    game = update_g_equip_total(game);
    return game;
}

export function update_g_equip_item_location(game, location_id, item) {
    const prev_item_id = game.equipped_items[location_id].item_id;
    if (prev_item_id !== 'none') {
        game = update_g_item(game, prev_item_id, 'current_location', 'backpack');
    }
    if (item === 'none') {
        game = update(game, {equipped_items: {[location_id]: {item_id: {$set: 'none'}}}});
        //game = update_g_equip_total(game);
        return game;
    }
    game = update_g_item(game, item.id, 'current_location', location_id);
    game = update(game, {equipped_items: {[location_id]: {item_id: {$set: item.id}}}});
    //game = update_g_equip_total(game);
    return game;
}

export function update_g_equip_weapon(game, item) {
    const h = parseInt(item.hands);
    if (h === 2) {
        // two hands weapon, replace both slots
        game = update_g_equip_item_location(game, 5, item);
        game = update_g_equip_item_location(game, 6, item);
    } else {
        // on hand weapon, choose which one
        const main_item_id = game.equipped_items[5].item_id;
        const off_item_id = game.equipped_items[6].item_id;
        if (main_item_id === 'none')
            return update_g_equip_item_location(game, 5, item);
        if (off_item_id === 'none')
            return update_g_equip_item_location(game, 6, item);
        const current_item = game.items[main_item_id];
        if (parseInt(current_item.hands) === 2) {
            // previous was a 2 hand weapon, remove it
            game = update_g_equip_item_location(game, 6, 'none');
        }
        game = update_g_equip_item_location(game, 5, item);
    }
    return game;
}

export function update_g_equip_armour(game, item) {
    let i = 0;
    for (const l of game.equipped_items) {
        if (item.slot === l.location) break;
        i++;
    }
    game = update_g_equip_item_location(game, i, item);
    return game;
}

export function update_g_equip_total(game) {
    game = update_g_equip_total_fn(game, 'str');
    game = update_g_equip_total_fn(game, 'dex');
    game = update_g_equip_total_fn(game, 'int');
    game = update_g_equip_total_fn(game, 'hp');
    game = update_g_equip_total_fn(game, 'dmg');
    game = update_g_equip_total_fn(game, 'def');
    return game;
}

export function update_g_equip_total_fn(game, field_name) {
    let total = 0;
    for (const k in game.items) {
        const item = game.items[k];
        if (item.current_location !== 'backpack' && field_name in item) {
            let v = parseInt(item[field_name]);
            if (isNaN(v)) v = 0;
            total += v;
        }
    }
    return update(game, {characteristics: {[field_name + '_items']: {$set: total}}});
}

export function get_item_at_slot(game, slot) {
    const s = game.equipped_items[slot];
    if (s.item_id === 'none') return 'none';
    return game.items[s.item_id];
}

export function get_item_at_hit_location(game) {
    const location = game.encounter.location.d100;
    if (location === 'none') return '';
    return get_item_at_slot(game, location);
}

export function is_attack_hit(c, att_type, value) {
    const att = parseInt(value);
    const a = parseInt(c[att_type]);
    const b = parseInt(c[att_type + '_items']);
    return (att < a + b);
}

export function get_table_name(letter) {
    if (letter[0] === 'A') return 'armour';
    if (letter[0] === 'I') return 'items';
    if (letter[0] === 'W') return 'weapon';
    if (letter[0] === 'P') return 'parts';
    if (letter[0] === 'T') {
        if (letter[1] === 'A') return 'treasureA';
        if (letter[1] === 'TB') return 'treasureB';
        if (letter[1] === 'TC') return 'treasureC';
    }
    return letter;
}











