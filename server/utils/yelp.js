import Yelp from 'yelp';

export const yelp = new Yelp({
    consumer_key: 'Q24KqARnK_xaO_2LEGJz0A',
    consumer_secret: 'nBLnEiAEX6vUditMdmLiQRV9NQc',
    token: 'A4TDlabYZhlX21gde9xmKJrjcUE6xa6s',
    token_secret: 'A9_5_sn0tlrQbQ073tsa-szdtME'
});

export const yelpCache = {};

const formatCategories = function (array) {
    return array.map(category => {
        return {
            id: category[1],
            display: category[0]
        }
    });
}

export const formatResults = function (results) {
    return results.businesses.map(result => {
        return {
            name: result.name,
            categories: formatCategories(result.categories),
            location: {
                address: result.location.address,
                coordinates: [
                    result.location.coordinate.latitude,
                    result.location.coordinate.longitude,
                ]
            },
            rating: result.rating
        }
    });
}
