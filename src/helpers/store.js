/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import {createStore} from 'redux'
import * as at from 'helpers/action_types'
import * as gr from 'helpers/action_reducers'
import {create_new_game} from "./character_helpers";

const store = setupStore()
export const store_name = 'd100_save'
export default store

export function defaultSaves() {
    // create a new game
    const new_game = create_new_game();
    // create a default list of saves
    let saves = {current: new_game.id};
    saves[new_game.id] = new_game;
    return saves;
}

export function read_saves_in_store() {
    let saves = {};
    //const st = global.localStorage.getItem('d100_save');
    if (global.localStorage.getItem('d100_save') !== null) {
        saves = JSON.parse(global.localStorage.getItem('d100_save'));
    } else {
        console.log('Cannot find local storage d100_save : use default');
        saves = defaultSaves();
        global.localStorage.setItem('d100_save', JSON.stringify(saves));
    }
    return saves;
}

export function setupStore() {
    // read from local store (if exist), or start with default
    const saves = read_saves_in_store();
    const initialState = saves[saves['current']];

    // list of action
    const rootReducer = (state = initialState, action) => {
        switch (action.type) {
            case at.SET_GAME:
                return gr.set_game(state, action.value);
            default:
                return state;
        }
    };

    return createStore(rootReducer);
}

