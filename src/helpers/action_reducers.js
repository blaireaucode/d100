/*
 * Copyright 2018
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import {v4 as uuidv4} from "uuid"
import update from "immutability-helper"
import * as st from "helpers/store"

export function set_game(state, value) {
    // save to store
    save_to_store(value);
    // return value
    return value;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function save_to_store(game) {
    //console.log('save to store', game)
    //await sleep(2000);
    let gg = game;
    if (!('id' in gg) || (gg.id === 'default')) {
        gg = update(gg, {id: {$set: uuidv4()}});
    }
    gg = update(gg, {date: {$set: new Date()}});

    // replace current save
    let saves = st.read_saves_in_store();
    const id = gg.id;
    let save = update(saves, {[id]: {$set: gg}});
    save = update(save, {current: {$set: id}});

    // save
    global.localStorage.setItem(st.store_name, JSON.stringify(save));
    return 1;
}

