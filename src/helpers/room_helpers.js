/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import rooms_table from 'tables/table_m_mapping.json'
import {v4 as uuidv4} from "uuid"

export function new_room(id = 'none') {
    // get the room
    let found = false;
    let i;
    id = id.toString()
    for (i in rooms_table) {
        const d100 = rooms_table[i].d100.toString();
        if (d100 === id) {
            found = true;
            break;
        }
    }
    if (!found) {
        console.log('ERROR : cannot find id ', id);
        i = 1;
    }
    let e = JSON.parse(JSON.stringify(rooms_table[i]));
    if (id === "none") {
        e["id"] = "none";
    } else {
        e["id"] = uuidv4();
        e["rotation"] = '';
        e["src"] = require('../images/' + id + '.png').default;
    }
    console.log('e', e);
    return e;
}
