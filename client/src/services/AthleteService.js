import axios from '../plugins/axios'


class AthleteService {
  // Get
  static getAll() {
    return new Promise((resolve, reject) => {
      axios.get('athletes')
        .then(({
          data
        }) => {
          resolve(data.map(athlete => ({
            ...athlete,
            createdAt: new Date(athlete.createdAt)
          })))
        })
        .catch((error) => reject(error))
    })
  }

  static getAllActive() {
    return new Promise((resolve, reject) => {
      axios.get('athletes/active')
        .then(({
          data
        }) => {
          resolve(data.map(athlete => ({
            ...athlete,
            createdAt: new Date(athlete.createdAt)
          })))
        })
        .catch((error) => reject(error))
    })
  }

  // Create
  static createOne(firstName, lastName) {
    return axios.post('athletes', {
      firstName,
      lastName
    })
  }

  // Update
  static updateOne(id, firstName, lastName) {
    return axios.put(`athletes/${id}`, {
      firstName,
      lastName
    })
  }

  // Delete
  static deleteOne(id) {
    return axios.delete(`athletes/${id}`)
  }
}

export default AthleteService