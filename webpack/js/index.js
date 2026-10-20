import { api } from '../../src/api'
import { utils } from '../../src/utils'
import { store } from '../../src/store'

api.request({
  method: 'POST',
  path: 'https://www.example.com/api/v2/getUser',
  payload: {
    userId: utils.getUserId()
  }
}).then(res => {
  console.log("../../src/api request result >>> res", res)
  store.setStore('user', res.data)
})