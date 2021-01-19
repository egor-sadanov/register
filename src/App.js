import React, { useState, useEffect } from 'react'
import { useAlert } from "react-alert";
import './App.css'
import rules from './rules.pdf'
import privacyPolicy from './privacy-policy.pdf'


function App() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
    phone: "",
    adults: 1,
    kids: 1,
    comment: ""
	})

  function encode(data) {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')
  }

  function handleSubmit(e) {
    e.preventDefault()
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

  useEffect(() => {
    document.getElementById("adults").value = formData.adults
    document.getElementById("kids").value = formData.kids
  })

  const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value })
  const alert = useAlert()
  const star = <span style={{color: "red"}}>*</span>

  return (
    <div className="app">
      <main>
        <div className="wrapper">
          <div className="head">
            <p className="yolki-head">Yölki</p>
            <div className="inner-head">
              <p>Russian House</p>
              <p>January 9</p>
              <p>12:00pm</p>
            </div>
          </div>
        </div>
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
                  value={formData.phone} 
                  onChange={handleChange} 
                  placeholder="enter your phone"
                  required
                />
              </div>
              <div className="selection-box">
                <div>
                  <label htmlFor="adults">Adults</label><br />
                  <select name="adults" id="adults" onChange={handleChange}>
                    {[...Array(11)].map((x, i) => <option key={i}>{i}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="kids">Kids</label><br />
                  <select name="kids" id="kids" onChange={handleChange}>
                    {[...Array(11)].map((x, i) => <option key={i}>{i}</option>)}
                  </select>
                </div>
              </div>
              <textarea 
                name="comment" 
                rows="4"
                value={formData.comment} 
                onChange={handleChange} 
                placeholder="comments (optional)"
              />
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
