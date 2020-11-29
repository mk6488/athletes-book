import axios from '../plugins/axios'

class WellnessService {
  // Get
  static getAll() {
    return new Promise((resolve, reject) => {
      axios.get('wellness')
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
  static createOne(athleteId, wellnessDate, weekNumber, athleteName, sleep, stress, fatigue, soreness, nutrition, average) {
    return axios.post('wellness', {
      athleteId,
      wellnessDate,
      weekNumber,
      athleteName,
      sleep,
      stress,
      fatigue,
      soreness,
      nutrition,
      average
    })
  }

  // Update
  static updateOne(id, wellnessDate, weekNumber, sleep, stress, fatigue, soreness, nutrition, average) {
    return axios.put(`wellness/${id}`, {
      wellnessDate,
      weekNumber,
      sleep,
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