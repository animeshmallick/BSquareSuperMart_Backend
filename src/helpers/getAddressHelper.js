// helpers/getAddressHelper.js

class AddressHelper {
    defaultAddress = {
        address_id: "pickup_at_store",
        addr_line1: "BSquareSupermart, Chinappa Layout",
        addr_line2:"Near Shilpitha Splendor Annex, Mahadevapura",
        city: "Bangalore",
        state: "Karnataka",
        pincode: "560048"
    };

    parseUserAddress(result) {
        if (!result || result.length === 0) {
            return {userAddress: [], storeAddress: this.defaultAddress};
        }
        // Filter out any rows that have no meaningful address data
        const filteredAddresses = result
            .filter(row => (row.addr_line1?.trim() || row.addr_line2?.trim()))
            .map(row => ({
                address_id: row.address_id,
                addr_line1: row.addr_line1,
                addr_line2: row.addr_line2,
                city: row.city,
                state: row.state,
                pincode: row.pincode
            }));

        if (filteredAddresses.length === 0) {
            return {userAddress: [], storeAddress: this.defaultAddress};
        }
        console.log(filteredAddresses);
        return {userAddress: filteredAddresses, storeAddress: this.defaultAddress};
    }
}

module.exports = new AddressHelper();
