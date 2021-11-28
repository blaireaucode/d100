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

class RoomImage extends Component {

    render() {
        const r = this.props.game.room;
        if (r.d100 === 'none') return '';
        return (
            <img className={'map-img'}
                 src={r.src}
                 alt={r.d100}
                 width={150}
                 align={'top'}
                 style={{transform: `rotate(${r.rotation}deg)`}}
                /* onClick={() => this.on_area_click([c,r])} */
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomImage)
