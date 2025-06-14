// helpers/addressHelper.js

// Default address to return if user not found
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
                address: this.defaultAddress
            };
        }

        const user = result[0];
        return {
            found: true,
            address: {
                addr_line1: user.addr_line1,
                addr_line2: user.addr_line2
            }
        };
    }
}

module.exports = new AddressHelper();
