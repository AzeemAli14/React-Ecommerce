import React, { useState } from 'react'

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}
const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields

  return (
    <div>
        <h1>Sign up with your Email and Password</h1>
        <form onSubmit={(event) => {
            console.log(event.target.values)
        }}>
            <label>Display Name</label>
            <input type="text" required/>

            <label>Email</label>
            <input type='email' required/>

            <label>Password</label>
            <input type='password' required/>

            <label>Confirm Password</label>
            <input type='password' required/>

            <button type='submit'>Sign up</button>
        </form>
    </div>
  )
}

export default SignUpForm