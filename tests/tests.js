var assert = chai.assert;

suite('Pruebas para CSV', function() {
    test('Comprobando que se devuelve una cadena', function() {
        original.value = "Columna1, Columna2";
        calculate();
        assert.isString(finaltable.innerHTML);
    });
    test('Comprobando que se devuelve una tabla', function() {
        original.value = "Columna1, Columna2";
        calculate();
        assert.deepEqual(finaltable.innerHTML, '<p>\n</p><table class="center" id="result">\n<tbody><tr>                    <td>Columna1</td>                                  <td> Columna2</td>              </tr>\n</tbody></table>');
    });
    test('Comprobando que el numero de resultados por columna sea correcto', function() {
        original.value = "Columna1, Columna2\nAtributo1, Atributo2, Atributo3";
        calculate();
        assert.deepEqual(err.innerHTML, "");
    });
    test('Comprobando error al no insertar valores', function() {
        original.value = "";
        calculate();
        assert.deepEqual(finaltable.innerHTML, "");
    });
});