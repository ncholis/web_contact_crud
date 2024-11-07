interface Props {
    contacts: {id: number, first_name: string, last_name:string, email: string}[],
    updateContact: (
        contact : {id: number, first_name: string, last_name:string, email: string}
    ) => void,
    updateCallback: () => void,
}

function ContactList({ contacts, updateContact, updateCallback }: Props) {
  const onDelete = async (id: number) => {
    try {
        const options = {
            method: "DELETE"
        }
        const res = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, options)
        if (res.status == 200) {
            updateCallback()
        } else {
            console.error("failed to delete")
        }
    }  catch (error) {
        alert (error)
    }
  }
  return (
    <>
        <div>
            <h2>Contacts</h2>
        </div>
        <table>
            <thead>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Actions</th>
            </thead>
            <tbody>
                { contacts.map((contact) => {
                    return (
                        <tr key={contact.id}>
                            <td>{contact.first_name}</td>
                            <td>{contact.last_name}</td>
                            <td>{contact.email}</td>
                            <td>
                                <button onClick={() => updateContact(contact)}>update</button>
                                <button onClick={() => onDelete(contact.id)}>delete</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </>
  );
}

export default ContactList