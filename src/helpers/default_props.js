/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import {set_game} from 'helpers/actions'

export const mapDispatchToProps = (dispatch) => ({
    set_game(value) {
        dispatch(set_game(value));
    }
});

export const mapStateToProps = store => {
    // console.log('mapStateToProps', store);
    return {
        game: store,
        //team: store.team,      // shortcut, allow to set props instead of game
        //room: store.room,      // shortcut, allow to set props instead of game
        //options: store.options // shortcut, allow to set props instead of game
    };
};
