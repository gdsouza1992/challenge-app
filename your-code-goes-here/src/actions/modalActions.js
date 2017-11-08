export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export function openModalAction(modalType, modalData) {
    return {
        type: OPEN_MODAL,
        payload: {
            isModalOpen: true,
            modalType,
            modalData
        }
    };
}

export function closeModalAction() {
    return {
        type: CLOSE_MODAL,
        payload: {
            isModalOpen: false
        }
    };
}
