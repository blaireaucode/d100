/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {mapDispatchToProps, mapStateToProps} from 'helpers/default_props';
import {Paper} from "@material-ui/core";
import CharacterMain1 from "./CharacterMain1";
import CharacterMain2 from "./CharacterMain2";
import CharacterMain3 from "./CharacterMain3";
import CharacterMain4 from "./CharacterMain4";

class CharacterMain extends Component {

    render() {
        return (
            <Paper elevation={5} className={'character_panel'}>
                <CharacterMain1/>
                <p/>
                <CharacterMain2/>
                <p/>
                <CharacterMain3/>
                <p/>
                <CharacterMain4/>
            </Paper>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterMain);
