import React, { useState } from 'react'
import { useAlert } from "react-alert";
import './App.css'
import rules from './rules.pdf'
import privacyPolicy from './privacy-policy.pdf'


function App() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
    phone: "",
    subscribe: "off"
	})

  function encode(data) {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log(formData)
		fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...formData })
    })
    .then( () => { 
      alert.show("We will send you all the details regarding payment within 1 day", {
        title: "Thank you, the form has been successfully submitted!",
        onClose: () => {
          window.location.reload()
        }
      })
    })
		.catch( err => {
      alert.show("Something went wrong. Please try again")
      console.log("err: ", err.message)
    })
  }

  const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value })
  const alert = useAlert()
  const star = <span style={{color: "red"}}>*</span>

  return (
    <div className="app">
      <main>
        <div className="flexbox">
          <div className="message">
            <p>Please be aware that due to the current covid restrictions in place, we are limited by the number of partons for the event. That said, we encourage you to purchase tickets in advance.</p>
            <p style={{marginBottom: 0}}>In the form below you can leave an inquiry and we will send you bank details for the transfer.</p>
          </div>
          <div className="form-container">
            <form onSubmit={e => handleSubmit(e)}>
              <input type="hidden" name="form-name" value="contact" />
              <p hidden>
                <label>
                  Don’t fill this out:{" "}
                  <input name="bot-field" onChange={handleChange} />
                </label>
              </p>
              <div>
                <label htmlFor="name">Name{star}</label><br />
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  className="wide" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="enter your name"
                  required 
                />
              </div>
              <div>
                <label htmlFor="email">Email{star}</label><br />
                <input 
                  type="email" 
                  name="email"
                  id="email" 
                  className="wide" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="enter your email"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone">Phone{star}</label><br />
                <input 
                  type="text" 
                  name="phone" 
                  id="phone"
                  className="wide"  
                  value={formData.phone} 
                  onChange={handleChange} 
                  placeholder="enter your phone"
                  required
                />
              </div>
              <div>
                <input 
                  type="checkbox" 
                  name="subscribe" 
                  id="subscribe" 
                  value="subscribed" 
                  onChange={handleChange} 
                />
                <label htmlFor="subscribe">I want to receive monthly newsletters from the Young Guard Collective</label>
              </div>
              <div style={{textAlign: "center"}}>
                <button id="submit" type="submit" className="submit-btn">submit</button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer>
        <div className="policy">
          <span>{star}by clicking submit you agree to our&nbsp;</span>
          <a href={privacyPolicy} target="_blank" rel="noopener noreferrer" className="code-link">privacy policy</a>
          <span> and&nbsp;</span>
          <a href={rules} target="_blank" rel="noopener noreferrer" className="code-link">code of conduct</a>
        </div>
        <div className="reference">
          <p>© 2021 "Russian House"</p>
          <p>
            designed by <a href="https://github.com/egor-sadanov" target="_blank" rel="noopener noreferrer" className="signature">sadanov</a>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
