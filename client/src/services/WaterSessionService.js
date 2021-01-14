import axios from '../plugins/axios'

class WaterSessionService {
  // Get
  static getAll() {
    return new Promise((resolve, reject) => {
      axios.get('water-sessions')
        .then(({
          data
        }) => {
          resolve(data.map(waterSession => ({
            ...waterSession,
            createdAt: new Date(waterSession.createdAt)
          })))
        })
        .catch((error) => reject(error))
    })
  }

  // static getFor(athleteId) {
  //   return new Promise((resolve, reject) => {
  //     axios.get(`wellness/${athleteId}`)
  //       .then(({
  //         data
  //       }) => {
  //         resolve(data.map(filteredWellness => ({
  //           ...filteredWellness,
  //           createdAt: new Date(filteredWellness.createdAt)
  //         })))
  //       })
  //       .catch((error) => reject(error))
  //   })
  // }

  // Create
  static createOne(sessionDate, cancelled, weather, launch1, launch2, boat1, boat2, boat3, boat4, boat5, boat6, boat7, boat8, boat9, outingPlan, trainingResults, nextOuting, incident) {
    return axios.post('water-sessions', {
      sessionDate,
      cancelled,
      weather,
      launch1,
      launch2,
      boat1,
      boat2,
      boat3,
      boat4,
      boat5,
      boat6,
      boat7,
      boat8,
      boat9,
      outingPlan,
      trainingResults,
      nextOuting,
      incident
    })
  }

  // Update
  static updateOne(id, sessionDate, cancelled, weather, launch1, launch2, boat1, boat2, boat3, boat4, boat5, boat6, boat7, boat8, boat9, outingPlan, trainingResults, nextOuting, incident) {
    return axios.put(`water-sessions/${id}`, {
      sessionDate,
      cancelled,
      weather,
      launch1,
      launch2,
      boat1,
      boat2,
      boat3,
      boat4,
      boat5,
      boat6,
      boat7,
      boat8,
      boat9,
      outingPlan,
      trainingResults,
      nextOuting,
      incident
    })
  }

  // Delete
  static deleteOne(id) {
    return axios.delete(`water-sessions/${id}`)
  }
}

export default WaterSessionService