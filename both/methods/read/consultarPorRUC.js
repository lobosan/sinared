Meteor.methods({
  consultarPorRUC: function (ruc) {
    check(ruc, String);

    let url = 'http://sinagap.magap.gob.ec/Enlaces/Service.asmx?wsdl';
    let args = {cadenaSRI: ruc};

    try {
      let client = Soap.createClient(url);
      let resultado = client.WBConsultaRUC(args).WBConsultaRUCResult;

      if (resultado) {
        let arrayResultado = resultado.split(';');

        if (arrayResultado[1] !== 'ERROR AL CONSULTAR RUC') {
          return {
            nombreOrganizacion: arrayResultado[1],
            actividadEconomica: arrayResultado[6],
            cedulaRepresentante: arrayResultado[9],
            nombreRepresentante: arrayResultado[8],
            direccion: arrayResultado[2],
            telefonoFijo1: arrayResultado[4],
            telefonoFijo2: arrayResultado[5],
            telefonoFijo3: arrayResultado[5]
          };
        } else {
          return {
            error: arrayResultado[1]
          }
        }
      } else {
        console.log(`Error: ${resultado}`);
      }
    } catch (exeption) {
      if (exeption.error === 'soap-creation') {
        console.log('SOAP Client creation failed');
      }
      else if (exeption.error === 'soap-method') {
        console.log('SOAP Method call failed');
      }
    }
  }
});
