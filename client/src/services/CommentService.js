import axios from '../plugins/axios'

class CommentService {
  // Get
  static getAll() {
    return new Promise((resolve, reject) => {
      axios.get('comments')
        .then(({
          data
        }) => {
          resolve(data.map(comment => ({
            ...comment,
            createdAt: new Date(comment.createdAt)
          })))
        })
        .catch((error) => reject(error))
    })
  }

  // Create
  static createOne(athleteId, commentDate, weekNumber, athleteName, commentType, comment) {
    return axios.post('comments', {
      athleteId,
      commentDate,
      weekNumber,
      athleteName,
      commentType,
      comment
    })
  }

  // Update
  static updateOne(id, commentDate, weekNumber, commentType, comment) {
    return axios.put(`comments/${id}`, {
      commentDate,
      weekNumber,
      commentType,
      comment
    })
  }

  // Delete
  static deleteOne(id) {
    return axios.delete(`comments/${id}`)
  }
}

export default CommentService