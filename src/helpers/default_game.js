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
        hero_path: 'Warrior',
        race: 'Human',
        hp: 20,
        hp_items: 0,
        rep: 1,
        fate: 3,
        life: 3,
        gold_pieces: 0,
        encounter_modifier: -40,
        str: 50,
        dex: 40,
        int: 30,
        str_items: 0,
        dex_items: 0,
        int_items: 0,
        str_exp: 0,
        dex_exp: 0,
        int_exp: 0,
        dmg: 0, // see later within weapon
        dmg_items: 0,
        armour: 0, // see later within weapon
        def_items: 0,
        mighty_blow: false,
        perfect_aim: false,
        spell_caster: false
    },

    items: {},
    equipped_items: {},
    skills: {},
    room: {}, // new_room('none')
    encounter: {}, // new_encounter('none')
    quest: {}, // new_quest('none')
    log: ''
}

export default default_game