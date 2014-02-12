"use strict";

 $(document).ready(function() { //Se utiliza JQuery para ejecutar una funcion sobre el documento HTML cuando se haya terminado de cargar la pagina.
   $("button").click(function() { //Se utiliza JQuery para ejecutar una funcion cuando se pincha en un objeto "button" de HTML.
     calculate(); //Funcion JavaScript que realiza la operacion CSV.
   });
 });

function calculate() {
  var result;
  var original = document.getElementById("original"); //Se recoge el elemento "original" del html.
  var temp = original.value; //temp es igual al valor de original.
  var regexp = /\s*"((?:[^"\\]|\\.)*)"\s*,?|\s*([^,]+),?|\s*,/g; //Cadenas que empiezan y terminan por 0 o mas espacios casando con todas las palabras entre "" y separadas por comas.
  var lines = temp.split(/\n+\s*/); //Corta el texto por el salto de linea y lo va añadiendo a un array.
  var commonLength = NaN; //La variable se inicializa a nulo.
  var r = [];
  // Plantilla usando underscore.
  var row = "<% _.each(items, function(name) { %>"     +
            "                    <td><%= name %></td>" +
            "              <% }); %>";

  if (window.localStorage) localStorage.original = temp;
  
  for(var t in lines) {
    var temp = lines[t];
    var m = temp.match(regexp); //Guarda en la variable m los resultados que van casando con la expresion regular.
    var result = []; // Array donde se guarda el resultado de la operacion CSV.
    var error = false;
    
    if (m) {
      if (commonLength && (commonLength != m.length)) { //Se pone error a true si el tamaño de m es nulo (vacio).
        error = true;
      }
      else {
        commonLength = m.length; //commonLength se iguala al tamaño de m.
        error = false;
      }
      for(var i in m) {
        var removecomma = m[i].replace(/,\s*$/,''); //Guarda en removecomma las cadenas borrando la coma.
        var remove1stquote = removecomma.replace(/^\s*"/,''); //Guarda en remove1stquote las cadenas borrando las comillas iniciales.
        var removelastquote = remove1stquote.replace(/"\s*$/,''); //Guarda en removelaststquote las cadenas borrando las comillas finales.
        var removeescapedquotes = removelastquote.replace(/\\"/,'"'); //Guarda en removeescapedquotes las cadenas borrando las comillas escapadas sustituyendolas por comillas.
        result.push(removeescapedquotes); //Guarda al final del array result la cadena modificada (removeescapedquotes).
      }
      var tr = error? '<tr class="error">' : '<tr>'; //Crea una clase tr de tipo "error" y la inicializa a la variable error, con el contenido de etiqueta "<tr>".
      r.push(tr+_.template(row, {items : result})+"</tr>"); //Guarda al final del array r la plantilla que crea una fila.
    }
    else {
      alert('ERROR! row '+t+' does not look as legal CSV'); //Muestra un PopUp de error si el texto que se ha insertado para realizar la conversion no es valido. 
      error = true;
      err.innerHTML = "";
    }
  }

    if(result.length != 0){
      r.unshift('<p>\n<table class="center" id="result">'); //Guarda al principio del array r la etiqueta de un parrafo  y se crea una tabla en el.
      r.push('</table>'); //Guarda al final del array r la estiqueta que cierra la tabla.
      finaltable.innerHTML = r.join('\n'); //Devuelve al HTML a la variable "finaltable" la tabla creada en r con un salto de linea convertido en un string.
    }
    else
      finaltable.innerHTML = "";
}

window.onload = function() {
  // Si el navegador soporta guardar datos locales y tenemos algun dato que guardar.
  if (window.localStorage && localStorage.original) {
    document.getElementById("original").value = localStorage.original;
  }
};