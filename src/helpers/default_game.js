/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

const default_game = {

    id: 'default',
    date: 'None',
    name: 'default',

    options: {
        dice_ui: {
            open: false,
            dices: []
        }
    },

    characteristics: {
        name: 'your name',
        hero_path: 'hero path',
        race: 'race',
        hp: 5,
        hp_items: 0,
        rep: 0,
        fate: 0,
        life: 1,
        gold_pieces: 0,
        encounter_modifier: 0,
        str: 10,
        dex: 10,
        int: 10,
        str_items: 0,
        dex_items: 0,
        int_items: 0,
        str_exp: 0,
        dex_exp: 0,
        int_exp: 0,
        dmg: 0, // see later within weapon
        armour: 0, // see later within weapon
        mighty_blow: false,
        perfect_aim: false,
        spell_caster: false
    },

    items: {},
    equipped_items: {},
    skills: {},
    room: {},
    encounter: {} // new_encounter('none')
}

export default default_game