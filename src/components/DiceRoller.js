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
import {close_dice_ui} from 'helpers/helpers_dice'
import DicesAnimation from 'helpers/DicesAnimation2'

class DiceRoller extends Component {

    constructor(props) {
        super(props);
        this.close = this.close.bind(this);

    }

    close() {
        const g = close_dice_ui(this.props.game);
        this.props.set_game(g);
    }

    render() {
        const dui = this.props.game.options.dice_ui;
        const dices = dui.dices;
        return (
            <div>
                <DicesAnimation
                    height='380px'
                    posY={5}
                    scaleFactor={1.0}
                    onClick={this.close}
                    dices={dices}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiceRoller)
