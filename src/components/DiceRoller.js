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
import {close_dice_ui} from 'helpers/dice_helpers'
//import DicesAnimation from 'helpers/DicesAnimation'
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
        /*
        let dices = [];
        let dice_type = DICE_TYPES.D6
        if (dui.max === 3)
            dice_type = DICE_TYPES.D4
        if (dui.max === 4)
            dice_type = DICE_TYPES.D4
        if (dui.max === 10)
            dice_type = DICE_TYPES.D10
        if (dui.max === 12)
            dice_type = DICE_TYPES.D12
        for (let d in dui.dices) {
            dices.push({
                type: dice_type,
                backColor: "black",
                //fontColor: (dui.dices[d] === 6 && dui.explosive) ? "yellow" : "green",
                fontColor: dui.colors[d],
                value: dui.dices[d]
            })
        }
        if (dices.length === 1) {
            dices[0].fontColor = "green"; // not explosive
        }
         */
        return (
            <div>
                <DicesAnimation
                    height='350px'
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
