/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

const default_game = {

    id: 'default',
    name: 'default',

    options: {
        dice_ui: {
            open: false,
            value: -1
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
        strength: 10,
        dexterity: 10,
        intelligence: 10,
        str_exp: 0,
        dex_exp: 0,
        int_exp: 0,
        mighty_blow: false,
        perfect_aim: false,
        spell_caster: false
    },

    items: {},
    skills: {}

}

export default default_game