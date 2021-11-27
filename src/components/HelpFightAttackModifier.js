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

class HelpFightAttackModifier extends Component {

    render() {
        const c = this.props.character;
        const class_mod = Math.floor(c.level / 2.0); // depends on the class
        return (
            <span className={'help'}>
                (class modifier {class_mod} + )
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HelpFightAttackModifier);
