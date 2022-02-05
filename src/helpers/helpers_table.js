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
import treasureB_table from 'tables/table_tb_treasure_B.json';
import treasureC_table from 'tables/table_tc_treasure_C.json';
import parts_table from 'tables/table_p_parts.json';
import find_table from 'tables/table_f_find.json';
import {d100_interval_min_max} from "./helpers_encounter";

export const all_search_tables = {
    weapon: weapon_table,
    armour: armour_table,
    needed: needed_table,
    treasureA: treasureA_table,
    treasureB: treasureB_table,
    treasureC: treasureC_table,
    parts: parts_table,
    find: find_table
}

export const tables_props = {
    weapon: {name: 'weapon', title: 'Table W - Weapons', short: 'Weapons'},
    armour: {name: 'armour', title: 'Table A - Armours', short: 'Armours'},
    needed: {name: 'needed', title: 'Table N - Needed', short: 'Neeed'},
    treasureA: {name: 'treasureA', title: 'Table TA - Treasure A', short: 'Treasure A'},
    treasureB: {name: 'treasureB', title: 'Table TB - Treasure B', short: 'Treasure B'},
    treasureC: {name: 'treasureC', title: 'Table TC - Treasure C', short: 'Treasure C'},
    parts: {name: 'parts', title: 'Table P - Parts', short: 'Parts'},
    find: {name: 'find', title: 'Table F - Find', short: 'Find'},
}

export const table_item_props = {
    weapon: [
        {att: 'd100', w: '11ch', h: 'D100'},
        {att: 'name', w: '25ch', h: 'Name'},
        {att: 'hands', w: '7ch', h: 'Hands'},
        {att: 'type', w: '6ch', h: 'Type'},
        {att: 'dmg', w: '6ch', h: 'dmg'},
        {att: 'gp', w: '6ch', h: '💰'},
        {att: 'fix_cost', w: '10ch', h: 'Fix Cost'}
    ],
    armour: [
        {att: 'd100', w: '10ch', h: 'D100'},
        {att: 'name', w: '32ch', h: 'Name'},
        {att: 'slot', w: '12ch', h: 'Slot'},
        {att: 'AS', w: '6ch', h: 'A,S'},
        {att: 'gp', w: '6ch', h: '💰'},
        {att: 'fix_cost', w: '10ch', h: 'Fix Cost'}
    ],
    needed: [
        {att: 'd100', w: '6ch', h: 'D100'},
        {att: 'name', w: '27ch', h: 'Name'},
        {att: 'detail', w: '68ch', h: 'Detail'},
        {att: 'gp', w: '8ch', h: '💰'}
    ],
    treasureA: [
        {att: 'd100', w: '8ch', h: 'D100'},
        {att: 'name', w: '22ch', h: 'Name'},
        {att: 'detail', w: '72ch', h: 'Detail'},
        {att: 'gp', w: '8ch', h: '💰'}
    ],
    treasureB: [
        {att: 'd100', w: '8ch', h: 'D100'},
        {att: 'name', w: '22ch', h: 'Name'},
        {att: 'detail', w: '72ch', h: 'Detail'},
        {att: 'gp', w: '8ch', h: '💰'}
    ],
    treasureC: [
        {att: 'd100', w: '8ch', h: 'D100'},
        {att: 'name', w: '22ch', h: 'Name'},
        {att: 'detail', w: '72ch', h: 'Detail'},
        {att: 'gp', w: '8ch', h: '💰'}
    ],
    parts: [
        {att: 'P1', w: '7ch', h: 'P1'},
        {att: 'P2', w: '7ch', h: 'P2'},
        {att: 'P3', w: '7ch', h: 'P3'},
        {att: 'P4', w: '7ch', h: 'P4'},
        {att: 'name', w: '16ch', h: 'Name'},
        {att: 'detail', w: '56ch', h: 'Detail'},
        {att: 'gp', w: '8ch', h: '💰'}
    ],
    find: [
        {att: 'd100', w: '8ch', h: 'D100'},
        {att: 'time', w: '7ch', h: 'Time'},
        {att: 'detail', w: '94ch', h: 'Detail'},
    ]

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

export function get_table_element(table, id, copy = true) {
    let found = false;
    let i;
    if (id !== 'none') id = parseInt(id);
    for (i in table) {
        if (id === table[i].d100) {
            found = true;
            break;
        }
        const d100 = d100_interval_min_max(table[i].d100);
        if (id >= d100[0] && id <= d100[1]) {
            found = true;
            break;
        }
    }
    if (!found) {
        console.log('ERROR : cannot find id in table, took the first', id, table[0]);
        i = 0;
    }
    let e = table[i];
    if (copy) e = JSON.parse(JSON.stringify(e));
    return e;
}










