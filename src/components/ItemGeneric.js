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
import ItemArmour from "./ItemArmour";
import ItemWeapon from "./ItemWeapon";
import ItemNeeded from "./ItemNeeded";
import ItemTreasure from "./ItemTreasure";
import ItemPart from "./ItemPart";

class ItemGeneric extends Component {
    render() {
        const t = this.props.item_type;
        if (t === 'armour') return <ItemArmour {...this.props} />;
        if (t === 'weapon') return <ItemWeapon {...this.props} />;
        if (t === 'needed') return <ItemNeeded {...this.props} />;
        if (t === 'treasureA') return <ItemTreasure {...this.props} />;
        if (t === 'parts') return <ItemPart {...this.props} />;
        return 'unknown item type ?';
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ItemGeneric)
