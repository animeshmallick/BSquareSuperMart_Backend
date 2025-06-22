// helpers/addressHelper.js

class AddressHelper {
    defaultAddress = {
        address: "BSquareSupermart, Chinappa Layout, Mahadevapura",
        city: "Bangalore",
        state: "Karnataka",
        zip: "560048"
    };

    parseUserAddress(result) {
        if (!result || result.length === 0) {
            return {
                found: false,
                address: []
            };
        }

        // Filter out any rows that have no meaningful address data
        const filteredAddresses = result
            .filter(row => (row.addr_line1?.trim() || row.addr_line2?.trim()))
            .map(row => ({
                addr_line1: row.addr_line1,
                addr_line2: row.addr_line2
            }));

        if (filteredAddresses.length === 0) {
            return {
                found: false,
                address: []
            };
        }

        return {
            found: true,
            address: filteredAddresses
        };
    }
}

module.exports = new AddressHelper();
