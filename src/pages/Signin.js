import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Layout from '../Layout'

const Signin = (props) => {
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = async (data) => {
    try {
      const { email, password } = data
      const res = await axios.post('http://www.td.coffee/api/users/signin', { email, password }, {
        headers: { 'Content-Type': 'application/json' }
      })

      // get token and store in localStorage
      const { token } = res.data
      global.auth.setToken(token)

      // redirect to home page
      props.history.push("/")
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <Layout>
      <div className="userForm">
        <form className="userForm__container d-flex flex-column" action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="userForm__container__title">
            Sign in
          </div>
          <div className="userForm__container__field d-flex flex-column">
            <label htmlFor="" className="input__label">Email</label>
            <input type="text"
              placeholder="Email"
              className="input__field"
              name="email"
              ref={register({
                required: "Email is required",
                pattern: {
                  value: /^([a-zA-Z0-9_\-\\.]+)@([a-zA-Z0-9_\-\\.]+)\.([a-zA-Z]{2,5})$/,
                  message: "invalid email",
                },
              })} />
            {/* error message */}
            {errors.email && (
              <p className="error__message">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="userForm__container__field d-flex flex-column">
            <label htmlFor="" className="input__label">Password</label>
            <input
              type="text"
              placeholder="Password"
              className="input__field"
              name="password"
              ref={register({
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "min length is 6",
                },
              })}
            />
            {/* error message */}
            {errors.password && (
              <p className="error__message">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="userForm__container__control d-flex flex-column">
            <button type="submit" class="submitButton">Login</button>
            <Link to="/users/signup">
              <button class="switchButton" type='button'>
                Sign up
            </button>
            </Link>

          </div>
        </form>
      </div>
    </Layout >
  )
};

export default Signin;
