

import { eventBusService } from "../services/event-bus.service.js"

const { useState, useEffect } = React

export function UserInteraction() {

    const [msg, setMsg] = useState(null)

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-interaction', msg => {
            setMsg(msg)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    function onCloseMsg() {
        setMsg(null)
    }

    if (!msg) return null

    return (
        <section className='user-interaction'>
            <p>{msg.txt}</p>
            <div className="button-field">
                <button onClick={() => {
                    msg.button.action()
                    onCloseMsg()
                }}>{msg.button.txt}</button>
                <button onClick={() => onCloseMsg()}>No</button>
            </div>
        </section>
    )
}
