import axios from 'axios'
// import axios from '../plugins/axios'

const url = 'api/wellness'

class WellnessService {
  // Get
  static getAll() {
    return new Promise((resolve, reject) => {
      axios.get(url)
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
    return axios.post(url, {
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