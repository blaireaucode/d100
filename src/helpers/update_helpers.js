/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import update from "immutability-helper";

/*
    ONLY update here, no set_game
 */

export function update_dic(dic, field_name, value) {
    return update(dic, {[field_name]: {$set: value}});
}

export function update_g_characteristic(game, field_name, value) {
    return update(game, {characteristics: {[field_name]: {$set: value}}});
}

//------------------------------------------------------------

export function update_character(team, character) {
    return update(team,
        {[character.id]: {$set: character}});
}

export function update_g_encounter(game, encounter) {
    return update(game,
        {encounter: {$set: encounter}});
}

export function update_g_team(game, team) {
    return update(game,
        {team: {$set: team}});
}

export function update_g_room(game, room) {
    return update(game,
        {room: {$set: room}});
}

export function update_g_options(game, options) {
    return update(game,
        {options: {$set: options}});
}

export function update_g_encounter_field(game, field_name, value) {
    /*const enc = game.room.encounter;
    const c = update_dic(enc, field_name, value)
    const t = update_encounter(game.room, c)
    return update_g_room(game, t);
    */
}

export function update_g_item_field(game, char_id, item_id, field_name, value) {
    const character = game.team[char_id];
    const index = character.items.findIndex(litem => litem.id === item_id);
    const item = update_dic(character.items[index], field_name, value);
    const items = update(character.items,
        {[index]: {$set: item}});
    const c = update_dic(character, 'items', items);
    const t = update_character(game.team, c)
    return update_g_team(game, t);
    /*return update(character,
        {[field_name]: {$set: value}});
*/
}
