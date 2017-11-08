const config = {
    baseUrls: {
        getInventory: 'https://apisandbox.dev.clover.com/v3/merchants/CKTZT7NW0VA5M/items?expand=itemStock',
        deleteInventory: 'https://apisandbox.dev.clover.com/v3/merchants/CKTZT7NW0VA5M/items/',
        editInventoryName: 'https://apisandbox.dev.clover.com/v3/merchants/CKTZT7NW0VA5M/items/',
        editInventoryStock: 'https://apisandbox.dev.clover.com/v3/merchants/CKTZT7NW0VA5M/item_stocks/',
        addInventoryName: 'https://apisandbox.dev.clover.com/v3/merchants/CKTZT7NW0VA5M/items'
    },
    accessToken: 'db609be0-9253-3fdd-c805-5c900969d657'
};

module.exports = config;
