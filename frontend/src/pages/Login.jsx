import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { post } from '../services/ApiEndpoint'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { SetUser } from '../redux/AuthSlice';
import logo from '../../src/assets/imgs/logo-white.png'
import '../styles/Login.css'

export default function Login() {
  const user = useSelector((state) => state.Auth)
  console.log(user)

  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password)
    try {
      const request = await post('/api/auth/login', { email, password })
      const response = request.data 

      if (request.status == 200) {
        if (response.user.role == 'super admin') {
          navigate('/super-admin')
        } else if (response.user.role == 'admin') {
          navigate('/admin')
        } else if (response.user.role == 'ticket clerk') {
          navigate('/')
        }
        toast.success(response.message)
        dispatch(SetUser(response.user))
      }
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    <div className='container'>
      <div className='login-container'>
        <h1>Welcome Back</h1>
        <p>lorem text text huhu yeah yeah omgomg</p>
        <form onSubmit={handleSubmit}>
          <div className='input-group'>
            <label htmlFor="Email">Email</label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className='input-group'>
            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input 
                type={isPasswordVisible ? "text" : "password"} 
                name="" 
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)} 
                id="password" 
                required
              />
              <i 
                onClick={() => setIsPasswordVisible(!isPasswordVisible)} 
                className={isPasswordVisible ? "show" : "hide"}>
                {isPasswordVisible ? (
                  <i className="fas fa-eye"></i> 
                ) : (
                  <i className="fas fa-eye-slash"></i> 
                )}
              </i>
            </div>
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
      <div className='logo'>
        <img src={logo} alt="logo" />
      </div>
    </div>
    </>
  )
}



