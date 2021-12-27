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
import {get_img} from "./helpers_dungeon";
import C from "./C";

class I extends Component {

    static defaultProps = {
        img_width: 25,
        width: '4ch'
    }

    render() {
        return (
            <C width={this.props.width}>
                <img className={'map-img'}
                     src={get_img(this.props.src)}
                     width={this.props.img_width}
                     align={'top'}
                />
            </C>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(I);
