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

class F extends Component {

    render() {
        return (<span className={'field_name'}>
                      {this.props.children}
                    </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(F);
