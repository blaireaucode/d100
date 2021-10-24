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
        health_points_primary: 5,
        health_points_adjusted: 5,
        rep: 0,
        fate: 0,
        life: 1,
        gold_pieces: 0,
        encounter_modifier: 0,
        str: 10,
        dex: 10,
        int: 10,
        str_adj: 10,
        dex_adj: 10,
        int_adj: 10,
        str_exp: 0,
        dex_exp: 0,
        int_exp: 0,
        mighty_blow: false,
        perfect_aim: false,
        spell_caster: false
    },

    items: {},
    skills: {},
    room: {},
    encounter: { // to remove
        id:0,
        d100:"11-20",
        name: 'Giant Bats',
        av: 25,
        def: 0,
        dmg: -3,
        hp: '2/3/3',
        k: 'Table P4',
        abilities: 'Fly, Surprise, Pack'
    }
}

export default default_game