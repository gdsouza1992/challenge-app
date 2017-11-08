import axios from 'axios';

import config from '../config/config';

export const FETCH_INVENTORY = 'FETCH_INVENTORY';

const editAxiosCalls = {};

export function fetchInventoryAction() {
    const url = `${config.baseUrls.getInventory}&access_token=${config.accessToken}`;
    return (dispatch) => axios.get(url)
        .then((response) => {
            dispatch({
                type: FETCH_INVENTORY,
                payload: response
            });
        });
}

function addNameToInventory(itemData) {
    const addNameUrl = `${config.baseUrls.addInventoryName}?access_token=${config.accessToken}`;
    const postNameData = {
        name: itemData.itemName,
        price: 0
    };
    return () => axios.post(addNameUrl, postNameData);
}

function editQuantityAfterAdd(createdItemResponse, itemData) {
    const newItemId = createdItemResponse.data.id;
    const editQuantityUrl = `${config.baseUrls.editInventoryStock}${newItemId}?access_token=${config.accessToken}`;
    const postQuantityData = {
        quantity: itemData.itemQuantity
    };
    return () => axios.post(editQuantityUrl, postQuantityData);
}

export function addInventoryAction(itemData) {
    return (dispatch) => {
        dispatch(addNameToInventory(itemData)).then((createdItemResponse) => {
            dispatch(editQuantityAfterAdd(createdItemResponse, itemData)).then(() => {
                dispatch(fetchInventoryAction());
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        });
    };
}

editAxiosCalls.editNameAction = (itemData) => {
    const editNameUrl = `${config.baseUrls.editInventoryName}${itemData.itemId}?access_token=${config.accessToken}`;
    const postData = {
        name: itemData.itemName,
        price: 0
    };
    return () => axios.post(editNameUrl, postData);
};

editAxiosCalls.editQuantityAction = (itemData) => {
    const editQuantityUrl = `${config.baseUrls.editInventoryStock}${itemData.itemId}?access_token=${config.accessToken}`;
    const postData = {
        quantity: itemData.itemQuantity
    };
    return () => axios.post(editQuantityUrl, postData);
};

export function editInventoryAction(itemData) {
    itemData.changedData = Array.from(new Set(itemData.changedData));
    const editAxiosCallsMap = itemData.changedData.map((changedValueAction) =>
        editAxiosCalls[changedValueAction](itemData));
    return (dispatch) => Promise.all(editAxiosCallsMap.map((call) => dispatch(call)))
        .then(() => {
            dispatch(fetchInventoryAction());
        }).catch((err) => {
            console.log(err);
        });
}


export function deleteInventoryAction(itemData) {
    const url = `${config.baseUrls.deleteInventory}${itemData.itemId}?access_token=${config.accessToken}`;
    return (dispatch) => axios.delete(url)
        .then(() => {
            dispatch(fetchInventoryAction());
        }).catch((err) => {
            console.log(err);
        });
}
