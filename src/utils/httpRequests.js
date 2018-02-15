import axios from 'axios';

const APIEndpoint = 'https://jsonplaceholder.typicode.com/users';

export const getUsers = async () => {
  try {
    const response = await axios.get(APIEndpoint);
    return {
      status: response.status,
      data: response.data,
    };
  } catch (e) {
    return {
      status: e.status,
      data: e.data,
    };
  }
}

export const getSingleUser = async (id) => {
  try {
    const response = await axios.get(`${APIEndpoint}/${id}`);
    return {
      status: response.status,
      data: response.data,
    }
  } catch (e) {
    return {
      status: e.status,
      data: e.data,
    };
  }
}

export const addUser = async (userData) => {
  try {
    const response = await axios.post(APIEndpoint, userData);
    return {
      status: response.status,
      data: response.data,
    }
  } catch (e) {
    return {
      status: e.status,
      data: e.data,
    };
  }
}

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${APIEndpoint}/${userId}`);
    return {
      status: response.status,
      id: userId,
    }
  } catch (e) {
    return {
      status: e.status,
      data: e.data,
    };
  }
}

export const editUser = async (userId, userData) => {
  try {
    const response = await axios.patch(`${APIEndpoint}/${userId}`, userData);
    console.log(response);
    return {
      status: response.status,
      data: response.data,
    }
  } catch (e) {
    return {
      status: e.status,
      data: e.data,
    };
  }
}
