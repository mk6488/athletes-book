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
  static createOne(firstName, lastName, squad, weight, current, refLoad, dofe, dob) {
    return axios.post('athletes', {
      firstName,
      lastName,
      squad,
      weight,
      current,
      refLoad,
      dofe,
      dob
    })
  }

  // Update
  static updateOne(id, firstName, lastName, squad, weight, current, refLoad, dofe, dob) {
    return axios.put(`athletes/${id}`, {
      firstName,
      lastName,
      squad,
      weight,
      current,
      refLoad,
      dofe,
      dob
    })
  }

  static toggleCurrent(id, current) {
    return axios.put(`athletes/${id}/toggle`, {
      current
    })
  }

  // Delete
  static deleteOne(id) {
    return axios.delete(`athletes/${id}`)
  }
}

export default AthleteService