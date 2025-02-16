const { Comment, User, Restaurant } = require('../models')
const commentController = {
  postComment: async (req, res, next) => {
    try {
      const { restaurantId, text } = req.body
      const userId = req.user.id
      if (!text) throw new Error('Comment text is required!')
      const user = await User.findByPk(userId)
      const restaurant = await Restaurant.findByPk(restaurantId)
      if (!user) throw new Error("User didn't exist!")
      if (!restaurant) throw new Error("Restaurant didn't exist!")
      await Comment.create({
        text,
        restaurantId,
        userId
      })
      res.redirect(`/restaurants/${restaurantId}`)
    } catch (err) {
      next(err)
    }
  },
  deleteComment: async (req, res, next) => {
    try {
      const comment = await Comment.findByPk(req.params.id)
      if (!comment) throw new Error("Comment didn't exist!")
      const deleteComment = await comment.destroy()
      res.redirect(`/restaurants/${deleteComment.restaurantId}`)
    } catch (err) { next(err) }
  }

}

module.exports = commentController
