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
import * as up from "./update_helpers"
import {
    get_table_element,
    update_character,
    update_dic,
    update_g_characteristic,
    update_g_encounter,
    update_g_encounter_field,
    update_g_room,
    update_g_team
} from "./update_helpers"
import {D6} from "helpers/dice_helpers"
import update from "immutability-helper"
import {v4 as uuidv4} from "uuid";
import H from "./H";
import {get_item_at_hit_location} from "./equipment_helpers";

export function parse_d100_interval(d100, id) {
    const mm = d100_interval_min_max(d100);
    const min = mm[0];
    const max = mm[1];
    return id >= min && id <= max;

}

export function d100_interval_min_max(d100) {
    d100 = d100.toString();
    if (d100 === 'none') return [0, 0];
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
    const e = get_table_element(encounters_table, id);
    if (id !== "none") e["id"] = uuidv4();
    else e["id"] = id;
    e["dmin"] = d100_interval_min_max(e.d100)[0];
    e["dmax"] = d100_interval_min_max(e.d100)[1];
    e["reaction"] = new_reaction();
    e["attack"] = new_attack();
    e["location"] = new_location();
    e["round"] = 1;
    e["initial_hp"] = e["hp"];
    return e;
}

export function new_reaction(id = 'none') {
    return get_table_element(reactions_table, id);
}

export function new_attack(id = 'none', dmg = 'none', who = 'character') {
    return {
        d100: id,
        dmg: dmg,
        who_attack: who,
        deflect: 0
    };
}

export function new_location(id = 'none') {
    return get_table_element(locations_table, id);
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
    if (att.dmg === 'none') return {total: 0, txt: ''};
    // encounter is attacking
    if (att.who_attack === 'encounter') {
        let armour = 0;
        let item = get_item_at_hit_location(game);
        if (item === 'none' || item === '') armour = 0;
        else {
            if ('AS' in item) {
                if (item.AS.includes('A')) armour = item.AS.substr(1);
                if (armour === '') armour = 0;
            }
        }
        if (isNaN(armour)) armour = 0;
        let deflect = 0;
        if ('deflect' in att)
            deflect = att.deflect
        total = parseInt(att.dmg) + parseInt(dm) + parseInt(e.dmg) - parseInt(armour) - parseInt(deflect);
        total = Math.max(0, total);
        if (dm >= 0) dm = ' + ' + dm;
        else dm = ' - ' + -dm;
        let dgi;
        if (e.dmg >= 0) dgi = ' + ' + e.dmg;
        else dgi = ' - ' + -e.dmg;
        txt = <span>
            {att.dmg} <H>(dice) </H>
            {dm} <H>(location) </H>
            {dgi} <H>(att dmg mod) </H>
            - {armour} <H>(def dmg mod) </H>
            - {deflect} <H>(deflect) </H>
            = {total}
        </span>
    } else {
        // player is attacking
        const edef = e.def === 'none' ? 0 : e.def;
        total = parseInt(att.dmg) + parseInt(dm) + parseInt(c.dmg_items) - parseInt(edef);
        total = Math.max(0, total);
        if (dm >= 0) dm = ' + ' + dm;
        else dm = ' - ' + -dm;
        let dgi;
        if (c.dmg_items >= 0) dgi = ' + ' + c.dmg_items;
        else dgi = ' - ' + -c.dmg_items;
        txt = <span>
            {att.dmg} <H>(dice) </H>
            {dm} <H>(location) </H>
            {dgi} <H>(dmg) </H>
            - {edef} <H>(monster def) </H>
            = {total}
        </span>
    }
    return {total: total, txt: txt}
}

export function apply_dmg(game) {
    const att = game.encounter.attack;
    if (att.who_attack === 'encounter')
        return apply_dmg_to_player(game);
    else
        return apply_dmg_to_encounter(game);
}

export function apply_dmg_to_encounter(game) {
    const r = compute_dmg(game);
    let total = r.total;
    return apply_n_dmg_to_encounter(game, total);
}

export function apply_n_dmg_to_encounter(game, n) {
    const e = game.encounter;
    const hps = e.hp.split('/');
    let nhps = [];
    for (const hp of hps) {
        nhps.push(Math.max(0, parseInt(hp) - n));
        n = Math.max(0, n - parseInt(hp));
    }
    nhps = nhps.join('/');
    return up.update_g_encounter_field(game, 'hp', nhps);
}

export function apply_n_dmg_to_encounter_index(game, n, index) {
    const e = game.encounter;
    const hps = e.hp.split('/');
    let nhps = [];
    let i = 0;
    for (const hp of hps) {
        if (index === i) {
            nhps.push(Math.max(0, parseInt(hp) - n));
            n = Math.max(0, n - parseInt(hp));
        } else {
            nhps.push(hp);
        }
        i++;
    }
    nhps = nhps.join('/');
    return up.update_g_encounter_field(game, 'hp', nhps);
}

export function apply_dmg_to_player(game) {
    const r = compute_dmg(game);
    const hp = game.characteristics.hp - r.total;
    return update_g_characteristic(game, 'hp', hp);
}

export function toggle_attack(game) {
    const att = game.encounter.attack;
    const w = att.who_attack === 'encounter' ? 'character' : 'encounter';
    return new_attack('none', 'none', w);
}

export function clear_g_attack(game) {
    const a = new_attack();
    const l = new_location();
    const r = new_reaction();
    let g = update_g_encounter_field(game, 'attack', a);
    g = update_g_encounter_field(g, 'location', l);
    return update_g_encounter_field(g, 'reaction', r);
}

export function update_attack_field(attack, fn, value) {
    return update(attack, {[fn]: {$set: value}});
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