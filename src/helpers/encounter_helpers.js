/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import encounters_table from 'tables/table_e_encounter.json'
import reactions_table from 'tables/table_monster_reaction.json'
import locations_table from 'tables/table_hit_location.json'
import ability_table from 'tables/table_encounter_ability.json'
import {update_character, update_dic, update_g_encounter, update_g_room, update_g_team} from "./update_helpers"
import {D6} from "helpers/dice_helpers"
import update from "immutability-helper"
import {v4 as uuidv4} from "uuid";
import H from "./H";

export function parse_d100_interval(d100, id) {
    const mm = d100_interval_min_max(d100);
    const min = mm[0];
    const max = mm[1];
    return id >= min && id <= max;

}

export function d100_interval_min_max(d100) {
    if (d100 === 'none') return ['none', 'none'];
    let min;
    let max;
    const index = d100.indexOf('-');
    if (index >= 0) {
        min = parseInt(d100.substr(0, index + 1));
        max = parseInt(d100.substr(index + 1, d100.length));
    } else {
        min = parseInt(d100);
        max = min;
    }
    return [min, max];
}

export function new_encounter(id = 'none') {
    const table = encounters_table;
    // get the encounter
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
    let e = JSON.parse(JSON.stringify(table[i]));
    if (id !== "none") e["id"] = uuidv4();
    else e["id"] = id;
    e["dmin"] = d100_interval_min_max(e.d100)[0];
    e["dmax"] = d100_interval_min_max(e.d100)[1];
    e["reaction"] = new_reaction();
    e["attack"] = new_attack();
    e["location"] = new_location();
    e["round"] = 1;
    return e;
}

export function new_reaction(id = 'none') {
    const table = reactions_table;
    // get the reaction
    let found = false;
    let i;
    for (i in table) {
        const d10 = table[i].d10;
        if (id === d10) {
            found = true;
            break;
        }
    }
    if (!found) {
        console.log('ERROR : cannot find id ', id);
        i = 1;
    }
    return JSON.parse(JSON.stringify(table[i]));
}

export function new_attack(id = 'none', dmg = 'none', who = 'character') {
    return {d100: id, dmg: dmg, who_attack: who};
}

export function new_location(id = 'none') {
    const table = locations_table;
    // get the reaction
    let found = false;
    let i;
    for (i in table) {
        const d10 = table[i].d10;
        if (id.toString() === d10.toString()) {
            found = true;
            break;
        }
    }
    if (!found) {
        console.log('ERROR : cannot find id ', id);
        i = 0;
    }
    console.log('location', table[i], i);
    return JSON.parse(JSON.stringify(table[i]));
}

export function get_ability(name) {
    const t = ability_table;
    for (let ab of t) {
        if (ab.name === name) return ab;
    }
    return t[0];
}

export function compute_dmg(game) {
    const e = game.encounter;
    const c = game.characteristics;
    const att = e.attack;
    const l = e.location;
    let total = '';
    let txt = '';
    // location
    let dm = l.dmg_mod === 'none' ? 0 : l.dmg_mod;
    if (isNaN(dm)) dm = 0;
    // attack dice
    if (att.dmg === 'none') return 0;
    // encounter is attacking
    if (att.who_attack === 'encounter') {
        total = parseInt(att.dmg) + parseInt(dm) + parseInt(e.dmg) - parseInt(c.armour);
        if (dm >= 0) dm = ' + ' + dm;
        else dm = ' - ' + -dm;
        let dgi;
        if (e.dmg >= 0) dgi = ' + ' + e.dmg;
        else dgi = ' - ' + -e.dmg;
        txt = <span>
            {att.dmg} <H>(dice) </H>&nbsp;
            {dm} <H>(location) </H>&nbsp;
            {dgi} <H>(dmg) </H>&nbsp;
            - {c.armour} <H>(armour) </H>&nbsp;
            = {total}
        </span>
    } else {
        // player is attacking
        const edef = e.def === 'none' ? 0 : e.def;
        total = parseInt(att.dmg) + parseInt(dm) + parseInt(c.dmg_items) - parseInt(edef);
        if (dm >= 0) dm = ' + ' + dm;
        else dm = ' - ' + -dm;
        let dgi;
        if (c.dmg_items >= 0) dgi = ' + ' + c.dmg_items;
        else dgi = ' - ' + -c.dmg_items;
        txt = <span>
            {att.dmg} <H>(dice) </H>&nbsp;
            {dm} <H>(location) </H>&nbsp;
            {dgi} <H>(dmg) </H>&nbsp;
            - {edef} <H>(monster def) </H>&nbsp;
            = {total}
        </span>
    }
    return {total: total, txt: txt}
}


// OLD -------------------------------------------------------

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