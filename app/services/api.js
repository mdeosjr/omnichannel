import axios from 'axios'

const BASE_URL = 'http://localhost:5000'

function createConfig(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}

async function createUser(user) {
  return axios.post(`${BASE_URL}/users`, user)
}

async function login(data) {
  return axios.post(`${BASE_URL}/login`, data)
}

async function getUser(token) {
  const config = createConfig(token)
  return axios.get(`${BASE_URL}/me`, config)
}

async function updateUser(data, token) {
  const config = createConfig(token)
  return axios.patch(`${BASE_URL}/users`, data, config)
}

export const api = {
  createUser,
  login,
  getUser,
  updateUser
}