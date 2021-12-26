/*
 * Copyright 2019
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import ReactDOMServer from 'react-dom/server';


export function log_quest(quest) {
    const a = <h1>New quest {quest.name}</h1>;
    return ReactDOMServer.renderToStaticMarkup(a);
}