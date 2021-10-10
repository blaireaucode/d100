/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {mapDispatchToProps, mapStateToProps} from 'helpers/default_props'
import ItemsTable from "./ItemsTable";

class ScreenTown extends Component {

    render() {
        return (
            <div>
                Town.<br/>
                Equipment may be bought before the game, or between games.
                Here is a list of items a character can buy, and their price in gold pieces (gp).
                <p/>
                <ItemsTable/>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenTown)
