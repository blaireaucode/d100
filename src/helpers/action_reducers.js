/*
 * Copyright 2018
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import update from "immutability-helper"
import * as st from "helpers/store"

export function set_game(state, value) {
    save_to_store(value);
    return value;
}

/*
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
*/

async function save_to_store(game) {
    //await sleep(2000);

    // update the date
    let gg = game;
    gg = update(gg, {date: {$set: new Date()}});

    //console.log('save',gg)

    // replace current save
    let saves = st.read_saves_in_store();
    const id = gg.id;
    saves = update(saves, {[id]: {$set: gg}});
    saves = update(saves, {current: {$set: id}});

    // save
    global.localStorage.setItem(st.store_name, JSON.stringify(saves));
    return 1;
}

