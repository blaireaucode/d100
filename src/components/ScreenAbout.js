/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import L from 'helpers/L'
import {mapDispatchToProps, mapStateToProps} from 'helpers/default_props'
import {Link} from "react-router-dom"
import default_game from "helpers/default_game"

class ScreenAbout extends Component {

    reset() {

    }

    render() {

        return (
            <div>
               about

            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenAbout)
