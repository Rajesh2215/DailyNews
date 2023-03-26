import React from 'react';
import axios from 'axios';

const apiUrl = `http://192.168.201.244:5500`;

export const register = async (req: {
  name: string;
  email: string;
  phone: string;
  gender: string;
  age: string;
  password: string;
}) => {
  try {
    console.log('inside axios');
    const resp = await axios.post(`${apiUrl}/user/register`, req);
    return resp;
  } catch (error) {
    console.log('error', error);
  }
};

export const login = async (req: {email: string; password: string}) => {
  try {
    console.log('inside axios');
    const resp = await axios.post(`${apiUrl}/user/login`, req);
    console.log('resp from backend', resp.data);
    return resp;
  } catch (error) {
    console.log('error', error.response.data);
    return error;
  }
};

export const fetchNews = async (country: string | undefined) => {
  console.log('On the way to backend for requests', country);
  const resp = await axios.post(`${apiUrl}/news/fetchNews`, country);
  return resp;
};

export const CData = async () => {
  console.log('Going to get country data');
  const resp = await axios.post(`${apiUrl}/news/country`);
  return resp;
};

export const CheckUser = async (req: {
  name: string;
  email: string;
  phone: string;
  gender: string;
  age: string;
  password: string;
}) => {
  try {
    console.log('checkuser axios');
    const resp = await axios.post(`${apiUrl}/user/checkUser`, req);
    console.log('resp ==>', resp.data);
    // return resp
  } catch (error) {
    console.log('Error=> ', error.response.data);
    return error.response.data;
  }
};

export const SendOtp = async (req: any) => {
  try {
    const resp = await axios.post(`${apiUrl}/mail/sendotp`, req);
    console.log('resp.data', resp.data);
    return resp;
  } catch (error) {
    console.log('error.response.data', error.response.data);
  }
};

export const verifyOtp = async (req, userData) => {
  try {
    console.log('verify Otp func in axios');
    const resp = await axios.post(`${apiUrl}/mail/verifyCode`, req, {
      headers: {
        userData: JSON.stringify(userData),
      },
    });
    return resp;
    // console.log('resp.data', resp.data)
  } catch (error) {
    console.log('error.response.data', error.response.status);
    return error.response;
  }
};
export const DeleteUser = async (email: any) => {
  console.log('email', email);
  const resp = await axios.get(`${apiUrl}/user/delete/${email}`);
  // console.log('resp', resp);
  return resp;
};

export const saveNews = async (item: any) => {
  try {
    console.log('Sending Saved News');
    const resp = await axios.post(`${apiUrl}/news/savedNews`, item);
    console.log('resp app 2', resp.status); //!Correct for success
    return resp.status;
  } catch (error) {
    console.log('resp.response.data 4', error.response.status);
    return error?.response?.status;
  }
};

export const fetchSavedNews = async(email:any)=>{
  try{
    console.log('Going to get Saved News',email)
    const resp = await axios.get(`${apiUrl}/news/fetchSavedNews/${email}`)
    // console.log('resp in fetchsavedNews', resp.data)
    return resp.data
  }
  catch(error){
    console.log('ERROR',error.response)
  }
}

export const DeleteSavedNews = async(email:any) =>{
  try{
    console.log('Going to delete savedNews',email)
    const resp = await axios.post(`${apiUrl}/news/DeleteSavedNews/${email}`)
    console.log('resp', resp.status)
    return resp.status
  }
  catch(error){
    console.log('error.response.data', error.response.data)
  }
}