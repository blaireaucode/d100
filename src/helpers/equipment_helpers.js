/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import weapon_table from 'tables/table_w_weapon.json'
import armour_table from 'tables/table_a_armour.json'
import {parse_d100_interval} from "./encounter_helpers"
import update from "immutability-helper"
import {v4 as uuidv4} from "uuid"


export function get_item_in_table(table, id, copy = true) {
    let found = false;
    let i;
    for (i in table) {
        const d100 = table[i].d100;
        if (d100 === id || parse_d100_interval(d100, id)) {
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
        return item;
    }
    return table[i];
}

export function get_weapon_in_table(id, copy = true) {
    let item = get_item_in_table(weapon_table, id, copy);
    item["item_type"] = 'weapon';
    return item;
}

export function get_armour_in_table(id, copy = true) {
    let item = get_item_in_table(armour_table, id, copy);
    item["item_type"] = 'armour';
    return item;
}

export function update_g_add_item(game, item) {
    return update(game, {items: {[item.id]: {$set: item}}});
}

export function update_g_remove_item(game, id) {
    return update(game, {items: {$unset: [id]}});
}

export function update_g_item(game, id, fn, v) {
    return update(game, {items: {[id]: {[fn]: {$set: v}}}});
}

export function new_equipped_items() {
    const items = [
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
    return items;
}

export function update_g_equip_item(game, id) {
    if (!(id in game.items)) {
        console.log('Error item not found', id, game.items);
        return game;
    }
    const item = game.items[id];
    if (item.item_type === 'weapon') return update_g_equip_weapon(game, item);
    return game;
}

export function update_g_equip_item_location(game, location_id, item) {
    const prev_item_id = game.equipped_items[location_id].item_id;
    if (prev_item_id !== 'none') {
        game = update_g_item(game, prev_item_id, 'current_location', 'backpack');
    }
    if (item === 'none') {
        return update(game, {equipped_items: {[location_id]: {item_id: {$set: 'none'}}}});
    }
    game = update_g_item(game, item.id, 'current_location', location_id);
    game = update(game, {equipped_items: {[location_id]: {item_id: {$set: item.id}}}});
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















