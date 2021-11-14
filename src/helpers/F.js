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

    static defaultProps = {
        width: 'auto',
        class_name: 'field_name'
    }

    render() {
        return (<span className={this.props.class_name}
                      style={{width: this.props.width}}>
                    {this.props.children}
                </span>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(F);
