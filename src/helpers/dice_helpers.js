/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import update from "immutability-helper"
import {update_g_options} from 'helpers/update_helpers'

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function get_dices(text) {
    let dice = {nb: 1, max: 6, mod: 0};
    dice.nb = text[0];
    dice.max = parseInt(text[2]);
    if (dice.nb === 'd') {
        dice.nb = 1;
        dice.max = parseInt(text[1]);
    }
    let i = text.indexOf('+');
    if (i > 0) {
        dice.mod = parseInt(text[i + 1]);
    }
    dice.nb = parseInt(dice.nb);
    return dice;
}


export function D6(explosive = true, nb = 1, mod = 0, max = 6) {
    const v = [];
    for (let i = 0; i < nb; i++) { // number of dice
        v.push(getRandomInt(1, max));
        if (explosive) {
            while (max === 6 && v[v.length - 1] === 6) { // explosive
                v.push(getRandomInt(1, 6));
            }
        }
    }
    let t = v.reduce((a, b) => a + b, 0)
    t = t + parseInt(mod); // modifier (like +2 in "1D6+2")
    return {total: t, dices: v, nb: nb, mod: mod, explosive: explosive, max:max};
}

/*
    game.options = {
        dice_ui: {
            open:true/false,
            value:
    }

 */

export function update_g_dice_ui(game, dice) {
    const options = update(game.options,
        {dice_ui: {$set: dice}});
    return update_g_options(game, options);
}

export function close_dice_ui(game) {
    const dice = {
        open: false,
        value: -1
    };
    return update_g_dice_ui(game, dice);
}

export function open_dice_ui(game, dice_value = -1) {
    const dice = {
        open: true,
        value: dice_value.total,
        dices: dice_value.dices,
        max: dice_value.max,
        explosive: dice_value.explosive
    };
    return update_g_dice_ui(game, dice);
}

