import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOtp({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(null)

  const Register = async () => {
    const {data, error} = await supabase.auth.signUp({
      username,
      password,
    },
    {
      data: {
        username
      }
    })
    if(error){
    //   setRMsg(error.message)
    console.log(error)
    }else{
      console.log(data);
    //   setRMsg('User created successfully')
    //   setUser(data.user)
    }
  }

  const Login = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email : "ritikrana4@gmail.com",
      password: "ritik",
    })
    if(error){
      // setLMsg(error.message)
    }else{
      // setLMsg('Login successfully')
      // setUser(data.user)
      // setSession(data.session)
      // console.log(data.session)
    }
  }

  return (
    <div className="row flex-center flex">
      <div className="col-6 form-widget" aria-live="polite">
        <h1 className="header">Supabase + React</h1>
        <p className="description">Sign in via magic link with your email below</p>
        {loading ? (
          'Sending magic link...'
        ) : (
          <form onSubmit={Register}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="inputField"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
             <div>
            <label htmlFor="password">password</label>
            <input
              id="password"
              type="text"
              value={password || ''}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
            <button className="button block" aria-live="polite">
              Send magic link
            </button>
            

            <button className="button block" aria-live="polite" onClick={Login}>
              Login
            </button>
            
          </form>



        )}
      </div>
    </div>
  )
}