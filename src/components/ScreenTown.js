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
import L from "../helpers/L"

class ScreenTown extends Component {

    render() {
        return (
            <div>
                <L to='/town' className={'clear'}> ✗ </L>
                <p/>
                <L to='/town/weapons'>Weapon table</L>
                <p/>
                <L to='/town/armours'>Armour table</L>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenTown)