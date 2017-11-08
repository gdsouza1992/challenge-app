
import { CLOSE_MODAL, OPEN_MODAL } from '../actions/modalActions';

export default function (state = {}, action) {
    switch (action.type) {
        case CLOSE_MODAL:
            return action.payload;
        case OPEN_MODAL:
            return action.payload;
        default:
            return state;
    }
}
