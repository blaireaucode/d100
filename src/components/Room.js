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

class Encounter extends Component {

    constructor(props) {
        super(props);
        this.clear_action = this.clear_action.bind(this);
    }

    clear_action() {
    }


    render() {
        const r = this.props.game.room;
        if (r.d100 === 'none') return '';
        return (
            <span>
                {/*<Paper elevation={5} className={'encounter'}>*/}
                <img className={'map-img'}
                     src={r.src}
                     alt={r.d100}
                     width={150}
                    /* style={{transform: `rotate(${rotation}deg)`}} */
                    /* onClick={() => this.on_area_click([c,r])} */
                />
                {r.d100} {r.color} {r.exits}
                {/*</Paper>*/}
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Encounter)
