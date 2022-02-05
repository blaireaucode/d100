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
import {update_dic, update_g_characteristic} from "./helpers_update"
import update from "immutability-helper"
import {v4 as uuidv4} from "uuid";
import H from "./H";
import {get_item_at_hit_location, get_item_at_slot} from "./helpers_equipment";
import {all_search_tables, get_table_element, get_table_name, new_table_roll} from "./helpers_table";
import {update_g_room} from "./helpers_dungeon";

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
    e["reward"] = new_reward(e);
    e["initial_hp"] = e["hp"];
    return e;
}

export function new_reward(e) {
    let r = new_table_roll();
    const tablen = get_reward_table_names(e);
    const table = tablen[0];
    let tables = {};
    for (const n of tablen) tables[n] = all_search_tables[get_table_name(n)];
    r.tables = tables;
    r.table = table;
    r.mod = get_table_mod(table);
    return r;
}

export function get_table_mod(table) {
    let mod = 0;
    if (table.includes('+')) {
        const i = table.indexOf('+');
        mod = table.substr(i + 1, table.length);
    }
    if (table.includes('-')) {
        const i = table.indexOf('-');
        mod = table.substr(i + 1, table.length);
    }
    return parseInt(mod);
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
        let sitem = get_item_at_slot(game, 6); // Off hand
        let shield = '(deflect)';
        if (sitem !== 'none') {
            if ('AS' in sitem) {
                if (sitem.AS.includes('S')) {
                    shield = '(shield)'
                }
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
            - {armour} <H>(armour) </H>
            - {deflect} <H>{shield} </H>
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

export function update_g_encounter(game, encounter) {
    return update(game,
        {encounter: {$set: encounter}});
}

export function update_g_encounter_field(game, field_name, value) {
    const enc = game.encounter;
    const c = update_dic(enc, field_name, value)
    return update_g_encounter(game, c)
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
    return update_g_encounter_field(game, 'hp', nhps);
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
    return update_g_encounter_field(game, 'hp', nhps);
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

export function clear_g_fight_action(game) {
    let r = game.room;
    if ('action' in game.room) {
        const previous = JSON.parse(JSON.stringify(game.room.action));
        r = update(game.room, {previous_action: {$set: previous}});
    }
    r = update(r, {$unset: ['action']});
    return update_g_room(game, r);
}

export function get_total_hp(encounter) {
    const hps = encounter.hp.split('/');
    const total = hps.reduce((a, b) => parseInt(a) + parseInt(b), 0);
    //console.log('hp', total);
    return total;
}

export function get_reward_table_names(encounter) {
    const rew = encounter.k;
    let r = rew.replace('Table ', '');
    r = r.split('/');
    return r;
}

// OLD -------------------------------------------------------
