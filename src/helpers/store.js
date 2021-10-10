/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import {createStore} from 'redux'
import default_game from "helpers/default_game"
import * as at from 'helpers/action_types'
import * as gr from 'helpers/action_reducers'

const store = setupStore()
export const store_name = 'd100_save'
export default store

export function defaultSaves() {
    return {current: 'default', default: default_game};
}

export function read_saves_in_store() {
    const saves = JSON.parse(global.localStorage.getItem('d100_save')) || defaultSaves();
    if (!('current' in saves)) {
        console.log('Error (1) reading store', saves)
        return defaultSaves();
    }
    const id = saves['current'];
    if (!(id in saves)) {
        console.log('Error (2) reading store', saves)
        return defaultSaves();
    }
    return saves;
}

export function setupStore() {
    // read from local store (if exist), or start with default
    const saves = read_saves_in_store();
    const initialState = saves[saves['current']];
    //console.log('LocalStorage read', initialState);

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

