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

