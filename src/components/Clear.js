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
import L from "helpers/L"

class Clear extends Component {

    render() {
        return (
            <L enabled={this.props.enabled} onClick={this.props.onClick} className={'clear'}> ✗ </L>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Clear)
