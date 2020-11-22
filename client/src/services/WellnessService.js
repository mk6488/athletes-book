import axios from '../plugins/axios'

class WellnessService {
  // Get
  static getAll() {
    return new Promise((resolve, reject) => {
      axios.get('wellness/')
        .then(({
          data
        }) => {
          resolve(data.map(wellness => ({
            ...wellness,
            createdAt: new Date(wellness.createdAt)
          })))
        })
        .catch((error) => reject(error))
    })
  }

  // Create
  static createOne(athlete, sleet, stress, fatigue, soreness, nutrition, average) {
    return axios.post('wellness/', {
      athlete,
      sleet,
      stress,
      fatigue,
      soreness,
      nutrition,
      average
    })
  }

  // Delete
  static deleteOne(id) {
    return axios.delete(`wellness/${id}`)
  }
}

export default WellnessService