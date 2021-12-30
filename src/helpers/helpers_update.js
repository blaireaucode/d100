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

export function update_g_options(game, options) {
    return update(game,
        {options: {$set: options}});
}

