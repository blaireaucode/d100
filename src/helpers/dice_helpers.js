/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import update from "immutability-helper"
import {update_g_options} from 'helpers/update_helpers'
import {DICE_TYPES} from "helpers/DicesAnimation2";

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
    return {total: t, dices: v, nb: nb, mod: mod, explosive: explosive, max: max};
}


export function get_dice_ui(game) {
    if ('options' in game)
        if ('dice_ui' in game.options)
            return game.options.dice_ui;
    return {open: false};
}

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

export function create_D100_rolling_dices(value) {
    let d1 = parseInt(Math.floor(value / 10));
    let d2 = parseInt(Math.floor(value - d1 * 10));
    if (value === 100) {
        d1 = 0;
        d2 = 0;
    }
    let dices = [];
    dices.push({
        type: DICE_TYPES.D10_100,
        backColor: "black",
        fontColor: "green",
        value: d1
    })
    dices.push({
        type: DICE_TYPES.D10,
        backColor: "black",
        fontColor: "green",
        value: d2
    })
    return dices;
}

export function create_D10_rolling_dice(value) {
    let dices = [];
    dices.push({
        type: DICE_TYPES.D10_1,
        backColor: "black",
        fontColor: "green",
        value: value - 1
    })
    return dices;
}

export function create_D6_rolling_dice(value) {
    let dices = [];
    dices.push({
        type: DICE_TYPES.D6,
        backColor: "black",
        fontColor: "green",
        value: value
    })
    return dices;
}

export function open_dice_ui(game, total, dices) {
    const dice = {
        open: true,
        total: total,
        dices: dices,
    };
    return update_g_dice_ui(game, dice);
}

