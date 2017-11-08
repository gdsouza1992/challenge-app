import { combineReducers } from 'redux';

import inventory from './inventoryReducer';
import modal from './modalReducer';

export default combineReducers({
    inventory,
    modal
});
