import React from 'react'
import axios from 'axios';

const apiUrl = `http://192.168.43.2:5500`

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

export const fetchNews = async(country: string | undefined) =>{
    console.log('On the way to backend for requests',country)
    const resp =await axios.post(`${apiUrl}/news/fetchNews`,country)
    return resp
}

export const CData = async() =>{
    console.log('Going to get country data')
    const resp =await axios.post(`${apiUrl}/news/country`)
    return resp
}