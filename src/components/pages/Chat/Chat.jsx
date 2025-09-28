import { useEffect, useRef, useState } from "react"
import { collection, addDoc, onSnapshot } from "firebase/firestore"
import "./Chat.css"
import { db } from "../../../config/database"

const Chat = () => {

  const [chatText, setChatText] = useState([])
  const [user, setUser] = useState("")
  const [userValido, setUserValido] = useState(false)
  const [text, setText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const typingTimeoutRef = useRef(null)

  useEffect(() => {

    const mensajes = onSnapshot(collection(db, "chat"), snapshot => {

      const datos = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))

      const mensajesOrdenados = datos.sort((a, b) => a.date - b.date)

      setChatText(mensajesOrdenados)
    })

    return () => mensajes()
  }, [])

  const handleInputChange = (e) => {

    const value = e.target.value

    setText(value)

    if (value.trim()) {
      setIsTyping(true)
      
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
      
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false)
      }, 1000)
    } else {
      setIsTyping(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await addDoc(collection(db, "chat"), {
      message: text,
      usuario: user,
      date: new Date()
    })

    console.log("Mensaje enviado:", text)
    setText("")
    setIsTyping(false)
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
  }

  const handleUser = (e) => {

    setUser(e.target.value)
  }

  const handleChat = () => {

    setUserValido(true)
  }
 
  return (
    <main>
      {
        !userValido ?
        <form onSubmit={handleChat}>
          <input type="text" placeholder="Ingrese usuario" onChange={handleUser} />
          <input type="submit" value="Enviar" />
        </form>
        :
        <div className="chat-container">
        <div className="chat-messages">
          {chatText.map(c => (
            <div key={c.id} className="message own">
              <div><strong>{c.usuario}:</strong></div>
              <div>{c.message}</div>
              <div className="message-time">
                {c.date?.toDate?.()?.toLocaleTimeString() || 'Ahora'}
              </div>
            </div>
          ))}
        </div>
        <form className="chat-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            className="chat-input"
            placeholder="Escribe tu mensaje..."
            onChange={handleInputChange} 
          />
          <input 
            type="submit" 
            value="Enviar" 
            className="chat-submit"
          />
        </form>
        <div className="typing-container">
          {text.length && (
            <div className="typing-indicator">
              <div className="typing-dots">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
              Escribiendo...
            </div>
          )}
        </div>
      </div>
      }
    </main>
  )
}

export default Chat