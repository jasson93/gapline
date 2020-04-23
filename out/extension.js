// Invoca al modo estricto de javascript (ECMAScript 5)
// para asegurar la ejecucion del código capturando errores
//dehabilitando funciones confusas, entre otras
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
//importa el modulo vscode que contiene el  API de VS Code
// referenciandolo con el alias 'vscode'
const vscode = require("vscode");
// creación del método que activa la extensión
// cuando se ejecuta el comando asociado a la extensión
function activate(context) {
    //muestra un mensaje de que la extension se ha activado
    //console.log('Gap Line está activado!');
    vscode.window.showInformationMessage('Gap Line está activado!');
    //se declara una variable que contendrá la orden de registro del comando extension.gaplin
    // y que a su vez enviará los parámetros de ejecución del comando: 
    let disposable = vscode.commands.registerCommand(
    // comando a registrar
    'extension.gapline', 
    // en este caso una función lambda
    () => {
        // declara una variable a la que se le asignará
        // el editor de texto que esté abierto (activo) 
        // o que no se haya guardado (undefinied)
        var editor = vscode.window.activeTextEditor;
        // si no hay editor de texto no retorna nada
        // se modificó para que muestre un mensaje de error
        if (!editor) {
            // return;
            // muestra un mensaje de error
            vscode.window.showErrorMessage('No se ha detectado ningún editor');
        }
        // declara una variable "selection" a la que se le asignará
        // el texto que esté seleccionado en el editor almacenado en la variable "editor"
        var selection = editor.selection;
        // declara una variable "text" a la que se le asignará
        // el texto seleccionado del documento asociado al editor de texto
        var text = editor.document.getText(selection);
        // muestra una caja de texto en la que se le pide al usuario
        // ingresar el intervalo de líneas para la inserción del salto de línea
        vscode.window.showInputBox({ prompt: '¿Cada cuantas líneas desea la inserción?' }).then(value => {
            // se crea una variable que almacenará el intervalo ingresado por el usuario
            let numberOfLines = +value;
            //crea una variable a la que se le asigna un arreglo string que almacenará el texto
            var textInChunks = [];
            // recorre el texto seleccionado y lo divide por salto de linea
            // y por cada linea que recorre
            text.split('\n').forEach((currentLine, lineIndex) => {
                // agrega el texto dividido al arreglo nuevo textInChunks
                textInChunks.push(currentLine);
                // si la linea actual (indice + 1) corresponde al intervalo ingresado por el usuario
                if ((lineIndex + 1) % numberOfLines === 0) {
                    //lo divide agregando un espacio en blanco
                    // despues del salto de línea (\n) para generar una nueva linea
                    textInChunks.push('');
                }
            });
            // luego de que divide el texto seleccionado 
            // une el arreglo dividido por el separador "\n"
            text = textInChunks.join('\n');
            // funcion lambda para editar el documento del editor activo
            editor.edit((editBuilder) => {
                // declara una variable de tipo rango
                // que almacenará el rango que recorrerá
                //desde la linea de inicio del texto seleccionado
                //partiendo del carcter 0
                // hasta el final de la línea del texto seleccionado
                //finalizando en el último caracter
                // tomado del tamaño del texto sin los separadores 
                // de la última linea del texto seleccionado
                var range = new vscode.Range(selection.start.line, 0, selection.end.line, editor.document.lineAt(selection.end.line).text.length);
                // utilizar el replace para reemplazar el texto seleccionado 
                // enviando el rango a recorrer 
                // y el texto a reemplazar
                editBuilder.replace(range, text);
            });
        });
    });
    // cierra la ejecución de la extensión
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// método que se ejecuta cuando la extensión se desactiva
function deactivate() {
    //muestra un mensaje por consola de que la extension se ha desactivado
    vscode.window.showInformationMessage('Your extension "gapline" is now inactive!');
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map