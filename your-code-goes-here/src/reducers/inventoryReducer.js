
import { FETCH_INVENTORY } from '../actions/inventoryActions';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_INVENTORY:
            return action.payload.data.elements;
        default:
            return state;
    }
}
