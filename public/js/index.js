//esto es cliente
const socket = io.connect()

function addNewMensaje(params) {
    const inputName = document.getElementById('name')
    const inputMensaje = document.getElementById('mensaje')
        console.log(inputName.value +' '+ inputMensaje.value+ ' '+'log del input');

        let today = new Date();
        let hora = today.getHours() + ':' + today.getMinutes()
        let fecha = today.getDate() + '-' + ( today.getMonth() + 1 )

        let inputMensajeArr = {
            id: socket.id,
            autor: inputName.value,
            mensaje: inputMensaje.value,
            fecha: fecha,
            hora: hora
        }

        document.getElementById('mensaje').value= ''
        socket.emit('mensaje', inputMensajeArr) 

    return false 
}

socket.on('mensajes', msjs =>{

    console.log(msjs,' ', 'log de los mensaje')

    if (msjs.length == 0) {
        
        document.getElementById('msjSpan').innerHTML = "no se encontraron mensajes"

    }else{
        
        const inputMsj = msjs.map(msj => `Mensaje de: ${msj.autor}, fecha: ${msj.fecha}, hora: ${msj.hora}, mensaje: ${msj.mensaje}.`).join
        ('<br>')
        document.getElementById('msjSpan').innerHTML = inputMsj

    }
})