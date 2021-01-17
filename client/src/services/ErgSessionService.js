import axios from '../plugins/axios'

class ErgSessionService {
  // Get
  static getAll() {
    return new Promise((resolve, reject) => {
      axios.get('erg-sessions')
        .then(({
          data
        }) => {
          resolve(data.map(ergSession => ({
            ...ergSession,
            createdAt: new Date(ergSession.createdAt)
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
  static createOne(sessionDate, weekNumber, cancelled, attendees, trainingPlan, trainingResults, incident) {
    return axios.post('erg-sessions', {
      sessionDate,
      weekNumber,
      cancelled,
      attendees,
      trainingPlan,
      trainingResults,
      incident
    })
  }

  // Update
  static updateOne(id, sessionDate, weekNumber, cancelled, attendees, trainingPlan, trainingResults, incident) {
    return axios.put(`erg-sessions/${id}`, {
      sessionDate,
      weekNumber,
      cancelled,
      attendees,
      trainingPlan,
      trainingResults,
      incident
    })
  }

  // Delete
  static deleteOne(id) {
    return axios.delete(`erg-sessions/${id}`)
  }
}

export default ErgSessionService