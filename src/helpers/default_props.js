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
    return {
        game: store,
    };
};
