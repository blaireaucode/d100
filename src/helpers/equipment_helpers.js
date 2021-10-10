/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import equipment_table from 'tables/equipment_table.json'
import armors_table from 'tables/armors_table.json'
import weapons_table from 'tables/weapons_table.json'
import {renderCellExpand} from "../components/renderTableCell";

export const equipment_tables = {
    "equipment": equipment_table,
    "armors": armors_table,
    "weapons": weapons_table,
}

export const columns_tables = {
    "equipment_old": [
        {field: 'id', headerName: 'ID', width: 20},
        {field: 'name', headerName: 'Name', flex: 0.2},
        {field: 'cost', headerName: 'Cost', width: 120},
        {field: 'description', headerName: 'Description', flex: 1, renderCell: renderCellExpand}],
    "equipment": [
        //{selector: 'id', name: 'ID', grow: 0, sortable: true},
        {selector: 'name', name: 'Name', grow: 5, sortable: true},
        {selector: 'cost', name: 'Cost', grow: 1, sortable: true},
        {selector: 'description', name: 'Description', wrap: true, sortable: true, grow: 30}],
    "armors": [
        //{selector: 'id', name: 'ID', grow: 0, sortable: true},
        {selector: 'name', name: 'Name', grow: 5, sortable: true},
        {selector: 'cost', name: 'Cost', grow: 1, sortable: true},
        {selector: 'description', name: 'Description', wrap: true, sortable: true, grow: 30}],
    "weapons": [
        //{button: true, cell: ''},
        //{selector: 'id', name: 'ID', grow: 0, sortable: true},
        {selector: 'name', name: 'Name', grow: 2, sortable: true},
        {selector: 'weapon_type', name: 'Type', grow: 2, sortable: true, wrap: true},
        {selector: 'damage_type', name: 'Damage', grow: 1, sortable: true},
        {selector: 'roll_modifier', name: 'Mod', grow: 1, sortable: true},
        {selector: 'cost', name: 'Cost', grow: 1, sortable: true},
        {selector: 'description', name: 'Description', wrap: true, sortable: true, grow: 6}
    ]
}