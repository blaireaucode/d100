/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import vermins_table from 'tables/vermins_table.json'
import minions_table from 'tables/minions_table.json'
import boss_table from 'tables/boss_table.json'
import {update_character, update_dic, update_g_encounter, update_g_room, update_g_team} from "./update_helpers";
import {D6, get_dices} from "helpers/dice_helpers"
import update from "immutability-helper";

const encounters_tables = {
    "vermin": vermins_table,
    "minion": minions_table,
    "boss": boss_table,
}

export function new_encounter(game, type, id) {
    // check for error (should not happen)
    if (!(type in encounters_tables))
        type = 'vermin';
    const table = encounters_tables[type];
    // get the encounter
    let found = false;
    let i;
    for (i in table) {
        if (table[i].id === id) {
            found = true;
            break;
        }
    }
    if (!found) {
        console.log('ERROR : cannot find id', id);
        i = 0;
    }
    const e = JSON.parse(JSON.stringify(table[i]));
    // roll number
    if ('number_roll' in e) {
        let d = get_dices(e['number_roll']);
        let t = D6(false, d.nb, d.mod);
        e.number = t.total;
        e.initial_number = t.total;
    }
    // life ?
    //if (!('life' in e)) e.life = 1;
    // update the encounter in the game

    // clear action and previous action
    let g = clear_action(game);
    g = update(g, {room: {$unset: ['previous_action']}});
    return update_g_encounter(g, e);
}

export function update_encounter_number(game, dice) {
    const t = dice.total;
    let g = update(game, {room: {encounter: {initial_number: {$set: t}}}});
    g = update(g, {room: {encounter: {number: {$set: t}}}});
    return g;
}

export function update_attack(game, id) {
    const dice = D6();
    const a = {
        id: id,
        dice: dice,
        action_type: 'attack'
    };
    const r = update(game.room, {action: {$set: a}});
    return update_g_room(game, r);
}

export function update_defend(game, id) {
    const dice = D6();
    const a = {
        id: id,
        dice: dice,
        action_type: 'defend'
    };
    const r = update(game.room, {action: {$set: a}});
    return update_g_room(game, r);
}

export function action_in_progress(game, id) {
    // Is there a action in progress ?
    if (!("action" in game.room)) return false;
    // Concern the current character ?
    return id === game.room.action.id;

}

export function clear_action(game) {
    let r = game.room;
    if ('action' in game.room) {
        const previous = JSON.parse(JSON.stringify(game.room.action));
        r = update(game.room, {previous_action: {$set: previous}});
    }
    r = update(r, {$unset: ['action']});
    return update_g_room(game, r);
}

export function get_action_mod(game) {
    const action = game.room.action;
    const c = game.team[action.id];
    if (action.action_type === 'attack') return c.attack_mod;
    if (action.action_type === 'defend') return c.def_mod;
}

export function get_action_total(game) {
    const action = game.room.action;
    const mod = get_action_mod(game)
    return parseFloat(action.dice.total) + parseFloat(mod);
}

export function apply_attack(game) {
    const l = game.room.encounter.level;
    // number or life ?
    let n = game.room.encounter.life;
    let m = "life";
    if ("number" in game.room.encounter) {
        n = game.room.encounter.number;
        m = "number";
    }
    const total = get_action_total(game);
    const diff = Math.floor(total / l);
    n = Math.max(0, n - diff);
    const e = update_dic(game.room.encounter, m, n);
    return update_g_encounter(game, e);
}

export function receive_wound(game) {
    let c = game.team[game.room.action.id];
    c = update_dic(c, "life", c.life - 1);
    const t = update_character(game.team, c);
    return update_g_team(game, t);
}

export function get_current_character(room) {
    if ('action' in room) return room.action.id;
    if (!('previous_action' in room)) return 1;
    const pr = room.previous_action;
    if (pr.action_type === 'attack') return pr.id;
    let i = pr.id + 1;
    if (i > 4) i = 1;
    return i;
}

export function get_current_action(room) {
    if ('action' in room) return room.action.action_type;
    if (!('previous_action' in room)) return 'attack';
    const pr = room.previous_action;
    if (pr.action_type === 'attack') return 'defend';
    return 'attack';
}