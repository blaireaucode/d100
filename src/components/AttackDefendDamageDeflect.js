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
import {get_item_at_hit_location, update_g_item} from "../helpers/helpers_equipment";
import Checkbox from "@material-ui/core/Checkbox";
import {compute_dmg, update_attack_field, update_g_encounter_field} from "../helpers/helpers_encounter";
import C from "../helpers/C";
import InputItemTrack from "./InputItemTrack";
import CollapsibleHelp from "./CollapsibleHelp";
import InputFieldItem from "./InputFieldItem";

class AttackDefendDamageDeflect extends Component {

    constructor(props) {
        super(props);
        this.state = {checked: false}
        const att = this.props.game.encounter.attack;
        // deflect 0 or 1 or 2 or 3 (both)
        if ('deflect' in att) {
            if (att.deflect === 0) this.state = {checked1: false, checked2: false};
            if (att.deflect === 1) this.state = {checked1: true, checked2: false};
            if (att.deflect === 2) this.state = {checked1: false, checked2: true};
            if (att.deflect === 3) this.state = {checked1: true, checked2: true};
        }
        //this.toggle = this.toggle.bind(this);
    }

    toggle = (pip) => {
        const e = this.props.game.encounter;
        const att = e.attack;
        const item = get_item_at_hit_location(this.props.game);
        //console.log('item', item, pip);
        let d = 0;
        let m = 1;
        if (pip === 1) {
            if (att.deflect === 0) d = 1;
            if (att.deflect === 1) d = 0;
            if (att.deflect === 2) d = 3;
            if (att.deflect === 3) d = 2;
        } else {
            if (att.deflect === 0) d = 2;
            if (att.deflect === 1) d = 3;
            if (att.deflect === 2) d = 1;
            if (att.deflect === 3) d = 1;
        }
        if (d < att.deflect) m = -1;
        if (d === 0) this.setState({checked1: false, checked2: false});
        if (d === 1) this.setState({checked1: true, checked2: false});
        if (d === 2) this.setState({checked1: false, checked2: true});
        if (d === 3) this.setState({checked1: true, checked2: true});
        const a = update_attack_field(this.props.game.encounter.attack, 'deflect', d);
        let g = update_g_encounter_field(this.props.game, 'attack', a);
        g = update_g_item(g, item.id, 'damaged', parseFloat(item.damaged) + m);
        this.props.set_game(g);
    }

    render() {
        const e = this.props.game.encounter;
        const att = e.attack;
        if (att.dmg === 'none') return '';
        if (att.who_attack === 'character') return '';
        const r = compute_dmg(this.props.game);
        if (r.total <= 0 && r.deflect === 0) return '';
        // Is the hero as a shield off hand ?
        let item = get_item_at_hit_location(this.props.game);
        let select1 = <Checkbox
            className={'field_input'}
            name={'toto'}
            checked={this.state.checked1}
            style={{width: '2ch'}}
            onChange={() => {
                this.toggle(1)
            }}
        />;
        let select2 = <Checkbox
            className={'field_input'}
            name={'toto'}
            checked={this.state.checked2}
            style={{width: '2ch'}}
            onChange={() => {
                this.toggle(2)
            }}
        />
        //  console.log('dmg', item.damaged, att.deflect);
        if (item.damaged - att.deflect > 4) select2 = '';
        if (item.damaged - att.deflect > 5) select1 = '';
        const w = item.name.length + 'ch';
        return (<span>
                <C width={'20ch'}/>
                Deflect with <span className={'help'}>
                <InputFieldItem id={item.id} field_name={'name'} width={w} align={'right'}/>
                </span>
                <C width={'1ch'}/>
                <C width={'6ch'}>
                {select1}
                    {select2}
                </C>
                <C width={'4ch'}/>
                Damaged:
                <InputItemTrack id={item.id}
                                items={this.props.game.items}
                                field_name={'damaged'}/>
                <CollapsibleHelp text={'(?)'}>
                    When an adventurer is damaged in combat, they may be able to deflect some of the damage to items they have equipped. It is entirely optional and the player may always allow the damage to be dealt to the adventurer. Items such as weapons and armour can be used to deflect up to 2 points of damage dealt to an adventurer, if they are equipped to the location the monster has struck; the damage is instead applied to the items damage track at the rate of 1 pip for each point deflected. Note that when an items damage track is full, it has been destroyed and is removed from the adventure sheet.
                </CollapsibleHelp>
               </span>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttackDefendDamageDeflect)
