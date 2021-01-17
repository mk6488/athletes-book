import axios from '../plugins/axios'

class SCSessionService {
  // Get
  static getAll() {
    return new Promise((resolve, reject) => {
      axios.get('sc-sessions')
        .then(({
          data
        }) => {
          resolve(data.map(scSession => ({
            ...scSession,
            createdAt: new Date(scSession.createdAt)
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
  static createOne(sessionDate, weekNumber, cancelled, weather, attendees, trainingPlan, trainingResults, incident) {
    return axios.post('sc-sessions', {
      sessionDate,
      weekNumber,
      cancelled,
      weather,
      attendees,
      trainingPlan,
      trainingResults,
      incident
    })
  }

  // Update
  static updateOne(id, sessionDate, weekNumber, cancelled, weather, attendees, trainingPlan, trainingResults, incident) {
    return axios.put(`sc-sessions/${id}`, {
      sessionDate,
      weekNumber,
      cancelled,
      weather,
      attendees,
      trainingPlan,
      trainingResults,
      incident
    })
  }

  // Delete
  static deleteOne(id) {
    return axios.delete(`sc-sessions/${id}`)
  }
}

export default SCSessionService