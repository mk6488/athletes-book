import axios from '../plugins/axios'

class TestService {
  // Get
  static getAll() {
    return new Promise((resolve, reject) => {
      axios.get('tests')
        .then(({
          data
        }) => {
          resolve(data.map(test => ({
            ...test,
            createdAt: new Date(test.createdAt)
          })))
        })
        .catch((error) => reject(error))
    })
  }

  // Create
  static createOne(athleteId, testDate, weekNumber, athleteName, test, result) {
    return axios.post('tests', {
      athleteId,
      testDate,
      weekNumber,
      athleteName,
      test,
      result
    })
  }

  // Update
  static updateOne(id, testDate, weekNumber, test, result) {
    return axios.put(`tests/${id}`, {
      testDate,
      weekNumber,
      test,
      result
    })
  }

  // Delete
  static deleteOne(id) {
    return axios.delete(`tests/${id}`)
  }
}

export default TestService