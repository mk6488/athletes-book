import axios from 'axios'
// import axios from '../plugins/axios'

const url = 'api/training-loads'


class TrainingLoadService {
  // Get
  static getAll() {
    return new Promise((resolve, reject) => {
      axios.get(url)
        .then(({
          data
        }) => {
          resolve(data.map(trainingLoad => ({
            ...trainingLoad,
            createdAt: new Date(trainingLoad.createdAt)
          })))
        })
        .catch((error) => reject(error))
    })
  }

  // Create
  static createOne(athlete, type, duration, rpe, load) {
    return axios.post(url, {
      athlete,
      type,
      duration,
      rpe,
      load
    })
  }

  // Delete
  static deleteOne(id) {
    return axios.delete(`training-loads/${id}`)
  }
}

export default TrainingLoadService