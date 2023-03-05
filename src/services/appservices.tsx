import React from 'react'
import axios from 'axios';

const apiUrl = `http://192.168.11.244:5500`

export const register = async (req: { name: string; email: string; phone: string; gender: string; age: string; password: string; }) =>{
    console.log('inside axios')
    const resp = await axios.post(`${apiUrl}/user/register`,req)
    return resp
}

export const login = async (req: { email: string; password: string; }) =>{
    console.log('inside axios')
    const resp = await axios.post(`${apiUrl}/user/login`,req)
    return resp
}

export const fetchNews = async() =>{
    console.log('On the way to backend for requests')
    const resp =await axios.post(`${apiUrl}/news/fetchNews`)
    return resp
}