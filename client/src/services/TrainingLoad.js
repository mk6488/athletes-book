import axios from 'axios'

const url = 'http://localhost:5000/api/training-loads/'

class TrainingLoad {
  // Get
  static getAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url)
        const data = res.data
        resolve(
          data.map(trainingLoad => ({
            ...trainingLoad,
            createdAt: new Date(trainingLoad.createdAt)
          }))
        )
      } catch (err) {
        reject(err)
      }
    })
  }

  // Create
  static createOne(athlete, type, duration, rpe, load) {
    return axios.trainingLoad(url, {
      athlete,
      type,
      duration,
      rpe,
      load
    })
  }

  // Delete
  static deleteOne(id) {
    return axios.delete(`${url}${id}`)
  }
}

export default TrainingLoad