const twilio = require('twilio');
const accountSid = 'TU_ACCOUNT_SID'; // Reemplaza con tu Account SID de Twilio
const authToken = 'TU_AUTH_TOKEN'; // Reemplaza con tu Auth Token de Twilio
const client = new twilio(accountSid, authToken);

async function mensajeSubastaGanada(idSubasta) {
    try {
        //Obtener los datos de la subasta para saber el ID del animal
        const responseSubasta = await fetch(`https://apisubastock.cleverapps.io/subasta/Obtener/${idSubasta}`);
        const dataSubasta = await responseSubasta.json();
        const idAnimal = dataSubasta.idAnimal;

        //Obtener la puja más alta y el ID del usuario ganador
        const responsePuja = await fetch(`https://apisubastock.cleverapps.io/subasta/PujasPorAnimal?idAnimal=${idAnimal}`);
        const dataPujas = await responsePuja.json();
        const pujaMasAlta = dataPujas.reduce((max, puja) => puja.valor > max.valor ? puja : max, dataPujas[0]);
        const idUsuarioGanador = pujaMasAlta.idUsuario;

        //Obtener el teléfono del usuario ganador
        const responseUsuarioGanador = await fetch(`https://apisubastock.cleverapps.io/usuario/Obtener?idUsuario=${idUsuarioGanador}`);
        const dataUsuarioGanador = await responseUsuarioGanador.json();
        const telefonoGanador = dataUsuarioGanador.telefono;

        //Obtener el teléfono del dueño del animal subastado
        const responseUsuarioAnimal = await fetch(`https://apisubastock.cleverapps.io/animal/Obtener?idAnimal=${idAnimal}`);
        const dataUsuarioAnimal = await responseUsuarioAnimal.json();
        const telefonoDueño = dataUsuarioAnimal.telefono;

        const mensaje = `¡Felicitaciones! Has ganado la subasta. Aquí tienes el teléfono del dueño del animal subastado: ${telefonoDueño}.`;

        await client.messages.create({
            body: mensaje,
            from: 'whatsapp:+14155238886', //Número de WhatsApp de Twilio
            to: `whatsapp:+${telefonoGanador}`
        });

        console.log("Mensaje enviado exitosamente");
    } catch (error) {
        console.error("Error al enviar el mensaje de WhatsApp:", error);
    }
}

function finalDeSubasta(idSubasta, fechaFin) {
    const intervalo = setInterval(async () => {
        const ahora = new Date();
        const fechaFinSubasta = new Date(fechaFin);

        if (ahora >= fechaFinSubasta) {
            await mensajeSubastaGanada(idSubasta);
            clearInterval(intervalo); // Detener el intervalo después de enviar el mensaje
        }
    }, 60000); // Verificar cada minuto
}

finalDeSubasta(idSubasta, subasta.fechaFin);