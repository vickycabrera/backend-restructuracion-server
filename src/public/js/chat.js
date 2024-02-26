
//Generamos una instancia de Socket.io, ahora desde el lado del cliente
const socket = io(); 

//Vamos a guardar el nombre del usuario
let user

//El objeto swal
Swal.fire({
    title: "Identificate",
    input: "text",
    text: "Ingrese un usuario para identificarse en el chat",
    inputValidator: (value)=>{
        return !value && "Necesitas escribir un nombre para continuar"
    },
    allowOutsideClick: false
}).then (res=>{
    user = res.value
})

const chatBox = document.getElementById("chatBox")

chatBox.addEventListener("keyup",(event)=>{
    if(event.key ==="Enter"){
        if( chatBox.value.trim().length > 0){
            //Si el mensaje luego de quitarle todos los espacios en blanco
            //tiene por lo menos 1 letra. lo enviamos al servidor
            socket.emit("message", {user, message: chatBox.value})
            chatBox.value = ""
        }
    }
})

//Listeners de mensajes:
socket.on("messagesLogs", (data)=>{
    let log = document.getElementById("messagesLogs")
    let mensajes = ""
    data.forEach(mensaje => {
        mensajes = mensajes + `${mensaje.user} dice: ${mensaje.message} <br/>`
    });
    log.innerHTML = mensajes
})