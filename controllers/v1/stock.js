const axios = require('../../services/axios');

const instance = axios.create({
  baseURL: 'https://www.apple.com',
});
const hitToApple = (data, store) => {
  console.log('instance data: ', data);
  console.log('instance store: ', store);
  return instance({
    method: 'GET',
    url: `/${store}/shop/fulfillment-messages?pl=${data.pl}&mt=${data.mt}&parts.0=${data.model}&location=${data.postalCode}`,
  });
};

module.exports = {
  index: async (req, res) => {
    try {
      const {
        postal_code: postalCode,
        model,
        location
      } = req.query;

      const data = {
        pl: true,
        mt: 'compact',
        model,
        postalCode
      };
  
      let result = await hitToApple(data, location);
      result = result.data.body.content

      if (result?.pickupMessage?.errorMessage) {
        return res.status(500).json({
          message: result?.errorMessage,
        });
      }
        
      let stores = result.pickupMessage.stores;
      let delivery = result.deliveryMessage[model.trim()];

      stores = stores.map((store) => {
        const partsAvailability = store.partsAvailability[model.trim()];
        return {
          storeEmail: store.storeEmail,
          storeName: store.storeName,
          storeNumber: store.phoneNumber,
          product: partsAvailability.storePickupProductTitle,
          pickupType: partsAvailability.pickupType,
          pickupAvailable: partsAvailability.pickupDisplay,
          delivery: {
            availability: delivery.defaultLocationEnabled ? 'available' : 'not-available',
            deliveryTime: delivery.quote,
          }
        }
      });
      return res.status(200).json({ data: stores });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Cannot process check stock',
      });
    }
  },
};