/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import Input from '@material-ui/core/Input'
import {mapDispatchToProps, mapStateToProps} from 'helpers/default_props'

class InputFieldHeader extends Component {

    static defaultProps = {
        width: '10ch',
        class_name: 'field_input_header',
        align: 'left',
        value: ''
    }

    render() {
        return (
            <Input className={this.props.class_name}
                   disableUnderline={true}
                   value={this.props.value}
                   style={{width: this.props.width}}
                   inputProps={{style: {textAlign: this.props.align}}}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputFieldHeader);
