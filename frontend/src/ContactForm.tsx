import { FormEventHandler, useState } from "react";

interface Props {
    existingContact: {id: number, first_name: string, last_name: string, email: string},
    updateCallback: () => void
}

function ContactForm({existingContact, updateCallback}: Props) {
  const [first_name, setFirstName] = useState(existingContact.first_name || "")
  const [last_name, setLastName] = useState(existingContact.last_name || "")
  const [email, setEmail] = useState(existingContact.email || "")

  const updating = Object.entries(existingContact).length !== 0

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault()

    const data = {
        first_name,
        last_name,
        email
    }
    const url = "http://127.0.0.1:5000/" + (updating ? `update_contact/${existingContact.id}` : "create_contact")
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    const res = await fetch(url, options)
    if (res.status !== 201 && res.status !== 200) {
        const data = await res.json()
        alert(data.message)
    } else {
        updateCallback()
    }
  }

  return (
    <form onSubmit={onSubmit}>
        <div>
            <label htmlFor="first_name">First Name:</label>
            <input type="text" id="first_name" value={first_name} onChange={(e) => setFirstName(e.target.value)}></input>
        </div>
        <div>
            <label htmlFor="first_name">Last Name:</label>
            <input type="text" id="last_name" value={last_name} onChange={(e) => setLastName(e.target.value)}></input>
        </div>
        <div>
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
        </div>
        <button type="submit">{updating ? 'Update' : 'Create'}</button>
    </form>
  )
}

export default ContactForm
