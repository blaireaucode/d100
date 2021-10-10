/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import CharacterInputField from "components/CharacterInputField"
import {mapDispatchToProps, mapStateToProps} from 'helpers/default_props'
import {capitalize, classes_list} from "helpers/character_helpers"
import {Paper} from "@material-ui/core"
import Select from '@material-ui/core/Select'

// import HelpAttackModifier from "./HelpAttackModifier";

class CharacterMain extends Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
        this.handle_change = this.handle_change.bind(this);
        this.toggle_traits = this.toggle_traits.bind(this);
    }

    const
    classes_options = classes_list.map((k) => {
        return (
            <option value={k.toLowerCase()} key={k}>{capitalize(k)}</option>
        );
    });

    handle_change(event) {
        /*const id = this.props.character;
        const v = event.target.value.toLowerCase();
        const g = update_g_characteristic(this.props.game, id, "class", v);
        this.props.set_game(g);
        */
    }

    toggle_traits(/*event*/) {
        const v = !this.state.open;
        this.setState({open: v});
    }

    class_selector(character) {
        return (
            <Select value={character.class.toLowerCase()}
                    onChange={this.handle_change}>
                {this.classes_options}
            </Select>
        )
    }

    render() {

        /*const c = this.props.game.team[this.props.character];
        const cl = classes_table[c.class.toLowerCase()];

        // list of traits (may be put elsewhere
        let clt = [];
        for (let key in cl) {
            if (key.includes('traits')) clt.push(key);
        }
        const ct = clt.map((k) => {
            return (<CollapsibleTraits key={k} cclass={cl} traits={k}/>);
        });*/

        // dead ? FIXME 
        //const c = this.props.characteristics;

        return (
            <span>
                <Paper elevation={5} className={'character'}>

                    Name: <CharacterInputField field_name={'name'}/>

                    Hero Path: <CharacterInputField field_name={'hero_path'}/>

                    Race: <CharacterInputField field_name={'race'}/>


                    {/*<CharacterInputField character={c} field_name={'name'}/>
                    {this.class_selector(c)}
                    <br/>
                Level: <CharacterInputField character={c} type={'number'} field_name={'level'}/>
                <br/>
                Life: <CharacterInputField character={c} type={'number'} field_name={'life'}/>
                <br/>
                Attack modifier: <CharacterInputField character={c} type={'number'} field_name={'attack_mod'}/>
                <br/>
                Defense modifier: <CharacterInputField character={c} type={'number'} field_name={'def_mod'}/>
                <br/>
                    {ct}*/}
                </Paper>
                <br/>
                {/*<ItemsList character={c}/>*/}
            </span>
        )
            ;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterMain);
