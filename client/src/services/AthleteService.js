import axios from 'axios'
// import axios from '../plugins/axios'

const url = 'api/athletes'

class AthleteService {
  // Get
  static getAll() {
    return new Promise((resolve, reject) => {
      axios.get(url)
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
    return axios.post(url, {
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