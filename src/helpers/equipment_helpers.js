/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import weapon_table from 'tables/table_w_weapon.json';
import {parse_d100_interval} from "./encounter_helpers";
import update from "immutability-helper"
import {v4 as uuidv4} from "uuid";


export function get_weapon_in_table(id, copy=true) {
    const table = weapon_table;
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
        return item;
    }
    return table[i];
}

export function update_g_add_item(game, item) {
    return update(game, {items: {[item.id]: {$set: item}}});
}

export function update_g_item(game, id, fn, v) {
    return update(game, {items: {[id]: {[fn]: {$set: v}}}});
}