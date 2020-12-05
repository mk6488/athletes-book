import axios from '../plugins/axios'

class TrainingLoadService {
  // Get
  static getAll() {
    return new Promise((resolve, reject) => {
      axios.get('training-loads')
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

  static getFor(athleteId) {
    return new Promise((resolve, reject) => {
      axios.get(`wellness/${athleteId}`)
        .then(({
          data
        }) => {
          resolve(data.map(filteredTrainingLoad => ({
            ...filteredTrainingLoad,
            createdAt: new Date(filteredTrainingLoad.createdAt)
          })))
        })
        .catch((error) => reject(error))
    })
  }

  // Create
  static createOne(athleteId, trainingDate, weekNumber, athleteName, type, duration, rpe, load) {
    return axios.post('training-loads', {
      athleteId,
      trainingDate,
      weekNumber,
      athleteName,
      type,
      duration,
      rpe,
      load
    })
  }

  // Update
  static updateOne(id, trainingDate, weekNumber, type, duration, rpe, load) {
    return axios.put(`training-loads/${id}`, {
      trainingDate,
      weekNumber,
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