/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React, {Component} from 'react'
import ReactModal from "react-modal"
import {connect} from "react-redux"
import {HashRouter as Router} from 'react-router-dom'
import {mapDispatchToProps, mapStateToProps} from 'helpers/default_props'
import Layout from 'Layout'
import DiceRoller from 'components/DiceRoller'
import {close_dice_ui, get_dice_ui} from 'helpers/helpers_dice'
import Debug from 'components/ScreenDebug'
import Character from 'components/ScreenCharacter'
import Map from 'components/ScreenMap'
import ScreenRoom from 'components/ScreenDungeon'
import ScreenFight from 'components/ScreenFight'
import Town from 'components/ScreenTown'
import ScreenSystem from 'components/ScreenSystem'
import ScreenAbout from "./components/ScreenAbout"
import ScreenQuest from "./components/ScreenQuest"
import ScreenLog from "./components/ScreenLog"

ReactModal.setAppElement('#root')

const style = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.0)'
    },
    content: {
        position: 'absolute',
        top: '10%',
        left: '20%',
        width: '41%',
        height: '40%',
        border: '0px solid #ccc',
        backgroundColor: 'rgba(255, 255, 255, 0.0)',
        background: 'rgba(255, 255, 255, 0.0)',
        //background: '#fff',
        //overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        //borderRadius: '4px',
        outline: 'none',
        //padding: '20px'
    }
}

class Routes extends Component {

    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        //const g = open_dice_ui(this.props.game, D6());
        const g = close_dice_ui(this.props.game);
        this.props.set_game(g);
    }

    render() {
        // console.log('Public url', process.env.PUBLIC_URL);
        const dice_ui = get_dice_ui(this.props.game);
        const dice_flag = dice_ui.open;
        return (
            <Router basename={process.env.PUBLIC_URL}>
                <div>
                    <ReactModal
                        onRequestClose={this.handleClose}
                        shouldCloseOnOverlayClick={true}
                        isOpen={dice_flag} style={style} close>
                        <DiceRoller/>
                    </ReactModal>
                    {/*<Layout path="/team" component={Team}/>*/}
                    <Layout path="/character" component={Character}/>
                    <Layout path="/map" component={Map}/>
                    <Layout path="/town" component={Town}/>
                    <Layout path="/room" component={ScreenRoom}/>
                    <Layout path="/fight" component={ScreenFight}/>
                    <Layout path="/debug" component={Debug}/>
                    <Layout path="/about" component={ScreenAbout}/>
                    <Layout path="/quest" component={ScreenQuest}/>
                    <Layout path="/log" component={ScreenLog}/>
                    <Layout path="/system" component={ScreenSystem}/>
                    <Layout exact path="/" component={ScreenSystem}/>
                </div>
            </Router>
        );
    }
}

//export default Routes;
export default connect(mapStateToProps, mapDispatchToProps)(Routes)

