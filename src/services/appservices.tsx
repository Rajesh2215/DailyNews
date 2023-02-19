import React from 'react'
import axios from 'axios';

const apiUrl = `http://192.168.152.244:5500`

export const register = async req =>{
    console.log('inside axios')
    const resp = await axios.post(`${apiUrl}/user/register`,req)
    return resp
}

export const login = async req =>{
    console.log('inside axios')
    const resp = await axios.post(`${apiUrl}/user/login`,req)
    return resp
}