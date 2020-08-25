import React, { useState, useEffect, useContext } from "react"
import { Button, Form, } from "react-bootstrap"
import axios from "axios"

import {AuthConsumer} from '../providers/AuthProvider'


const Profile = () => {
  const user = useContext(AuthConsumer) //This gives us global access to the user

  const [email, setEmail] = useState("")
 
  const [password, setPassword] = useState("")

  const profile = {
    email,
    password,
  }

  useEffect(() => {
    if (user.id) {
 
      setEmail(user.email)
  
      setPassword(user.password)
    }
  }, [user.id, user.email, user.password])

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.put("/api/profile", {id: user.id, email, password}) 
      .then(res => {
        user.handleUpdatePersonalInfo(profile)
      })
  }

  return (
    <>
      <Form onSubmit={handleSubmit} style={{
        width: '50rem'
    }}>
        <br/>
      <Form.Label>Change Email </Form.Label>
        <Form.Control
          placeholder="Email"
          name="email"

          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br/>
        {/* <br />
        <h1>Change Password</h1>
        <hr />
        <Form.Control
          placeholder="Current Password"
          name="Current Password"
        
        //   value={password}
        //   onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <Form.Control
          placeholder="Type New Password"
          name="Type New Password"

          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /> */}
        <Button type="submit" > 
          Save</Button>
        
    
          
        <br />
        <br />
      </Form>
    </>
  )
};

export default Profile;



