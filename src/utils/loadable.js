import React from 'react';
import Loadable from 'react-loadable';
// import loadable from '@loadable/component'

export default (loader) => {
    return Loadable({
        loader,
        loading() {
            return <div>Loading...</div>
        },
    });
}