/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import Encounter from 'components/Encounter'
import {mapDispatchToProps, mapStateToProps} from 'helpers/default_props'
import EncounterRoll from "components/EncounterRoll"
import AttackRollEncounterReaction from "./AttackRollEncounterReaction";
import AttackRoll from "./AttackRoll";
import AttackRollHitLocation from "./AttackRollHitLocation";
import AttackRollDamage from "./AttackRollDamage";


class ScreenRoom extends Component {

    render() {
        return (
            <div>
                <EncounterRoll/>
                <p/>
                <Encounter/>
                <p/>
                <AttackRollEncounterReaction/>
                <p/>
                <AttackRoll/>
                <p/>
                <AttackRollHitLocation/>
                <p/>
                <AttackRollDamage/>
                <br/>

                <p/>
                <br/>
                <br/>
                <br/>
                {/*<Paper className={'help'}>
                    1. Roll 1d10 on the “Monster Reaction” table to determine its action in the forthcoming round, then
                    continue to step 2.
                    <br/>
                    2. The player determines their course of action and this will greatly depend on the monster's
                    reaction.
                    If the monster's reaction is to escape, the adventurer may attempt to “Block the Escape”, or choose
                    to simply let it go, and the player removes the monster from the combat track. Alternatively, they
                    may take a wild swing hoping to finish it off before it escapes. If the monster is going to attack,
                    the
                    adventurer may decide they will try and escape themselves (see Escaping), make an attack (go to
                    Step 3), or choose to perform a combat action (See Combat Actions).
                    <br/>
                    3. To attack a monster, the player rolls 1d100 and must score equal to, or below the adventurer’s
                    adjusted
                    Str, or Dex value; which is used depends on the weapon being used. Hand Weapons (H) use Str, whilst
                    Ranged Weapons (R) use Dex to hit the monster. If the character has two weapons equipped, either may
                    be used to attack, but not both. If the result scores a hit go to step 4, otherwise go to step 5.
                    <br/>
                    4. Roll both the damage die (1d6) and the location die (1d10) together and apply the damage modifier
                    to the damage die for the location rolled (see the Hit Location table) and the adventurer’s DMG
                    modifier (if any), then deduct the monsters DEF value from the modified damage dice. The
                    remaining amount is the number of HP that are dealt to the monster, or monsters if encountering
                    more than one (see Monster Ability - Pack).
                    <br/>
                    5. If the monster attempted to escape and has remained, start a new combat round from Step 1,
                    otherwise it will make an attack. Roll 1d100 equal to, or less than the monsters Attack Value (AV),
                    and if the result scores a hit go to step 6, otherwise start a new combat round from step 1.
                    <br/>
                    6. Roll both the damage die (1d6) and the location die (1d10) together and apply the damage modifier
                    to
                    the damage dice for the location rolled (see the Hit Location table), add the monsters DMG modifier
                    (if
                    any), then if the adventurer has any armour equipped to the location struck, the Armour (A) value is
                    deducted. The remaining amount is the number of HP that is dealt to the adventurer. However, some
                    damage may also be deflected to armour worn at the location struck, or to a shield if carried in the
                    adventurer's off hand (see Damage Deflection). If the Adventurer has a Defence (Def) bonus they may
                    also be able to shrug off some more damage (See Defence Bonus). If the monster survived start a new
                    combat round from step 1.
                </Paper>*/}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenRoom)
