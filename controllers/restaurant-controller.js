const { Restaurant, Category } = require('../models')
const restaurantController = {
  getRestaurants: (req, res) => {
    return Restaurant.findAll({ include: Category, nest: true, raw: true })
      .then(restaurants => {
        const data = restaurants.map(r => ({
          ...r, description: r.description.substring(0, 50)
        }))
        console.log(restaurants)
        return res.render('restaurants', { restaurants: data })
      })
  }
}

module.exports = restaurantController
