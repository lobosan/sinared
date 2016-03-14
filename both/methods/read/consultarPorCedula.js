Meteor.methods({
  consultarPorCedula: function (cedula) {
    check(cedula, String);

    let url = 'http://sinagap.magap.gob.ec/Enlaces/Service.asmx?wsdl';
    let args = {cadena: cedula};

    try {
      let client = Soap.createClient(url);
      let resultado = client.WBConsultaCed(args).WBConsultaCedResult;

      if (resultado) {
        let arrayResultado = resultado.split(';');

        return {
          apellidos: arrayResultado[13],
          nombres: arrayResultado[12],
          fechaNacimiento: arrayResultado[3],
          edad: moment().diff(moment(arrayResultado[3],"DD/MM/YYYY"), 'years'),
          sexo: arrayResultado[11],
          estadoCivil: arrayResultado[5]
        };
      } else {
        console.log(`Error: ${resultado}`)
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
