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
import RoomMenu from "./RoomMenu";

class RoomImage extends Component {

    static defaultProps = {
        width: 170,
        room: 'current'
    }

    render() {
        let r = this.props.room;
        let m = '';
        let b = 0;
        if (this.props.room === 'current') {
            r = this.props.game.room;
            if (r.d100 === 'none') return '';
        } else {
            if (r.id !== 'empty') {
                m = <RoomMenu room={r}/>;
                if (r.index[0] === this.props.game.quest.dungeon.last_room[0] &&
                    r.index[1] === this.props.game.quest.dungeon.last_room[1])
                    b = 2;
            }
        }
        //console.log('state', this.state.over)
        return (
            <span style={{position: 'relative', zIndex: 0}}>
                <img className={'room'}
                     src={r.src}
                     alt={r.d100}
                     width={this.props.width}
                     align={'top'}
                     style={{transform: `rotate(${r.rotation}deg)`}}
                     onMouseOver={this.over}
                     onMouseOut={this.leave}
                     border={b}
                />
                {m}
            </span>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomImage)
