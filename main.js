//CÓDIGO para configurar las propiedades de la cámara web y hacer que capture la  toma.
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
// index.html habíamos definido un div con id="cámara". Este div lo definimos para mostrar la vista en vivo de la cámara web.
//Así que ahora la variable ‘camera’ tiene el div HTML.
camera = document.getElementById("camera");

//cuanto se cargue la página se activará la cámara y aparecerá una ventana emergente pidiendo permiso.
Webcam.attach('#camera');

//CÓDIGO para capturar la imagen.     
function take_snapshot() {

    Webcam.snap(function (data_uri)
    //es una función predefinida de webcam.js que se usa para tomar fotos con una cámara web. 
    //Esta función contiene data_uri, que se puede usar para mostrar la vista previa de una foto.
    {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
        //data uri para mostrar la imagen almacena la ruta de la imagen.
    });
}

//fabric.js se utiliza para trabajar eficientemente en un lienzo.
//webcam.js se utiliza para trabajar con una cámara y capturar imágenes.
//la librería ml5.js se utiliza para trabajar con el aprendizaje automático= detecta las imágenes de un video o de una cámara web en vivo.
console.log('ml5 version:', ml5.version);

// Código JS para importar el modelo define variable "classifier"
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/sAJaXvakl/model.json', modelLoaded);
//imageClassifier es una función predefinida de ml5.js que se utiliza para activar la función de clasificación de imágenes de ml5.js.

function modelLoaded() {
    //Si no pasamos esta función, entonces la clasificación de imágenes ml5 no se iniciará.
    console.log('Model Loaded!');
    //carga el modelo
} // HASTA AQUI LLEGA CLASE 104

function check() //INICIA CLASE 105
{
    //define la función captura la imagen capturada y la almacena en una variable.

    img = document.getElementById('captured_image');
    //variable= classifier
    //modelo= classify
    classifier.classify(img, gotResult);
}

//El propósito de esta función es mostrar el resultado que se logra después de identificar la imagen con el modelo en la función check().
function gotResult(error, results) {
    //tiene dos parámetros: uno para errores y otro para resultados.
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        //nombre del objeto se le asigna una variable de tipo arrays
        document.getElementById("result_object_name").innerHTML = results[0].label;
        //contiene una etiqueta de confianza (confidence) = precisión.
        document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3);
        //Aquí solo queremos 3 dígitos después del decimal. Es por eso por lo que colocamos el número 3 dentro de toFixed(). 
        //Tú puedes colocar el número que prefieras.
    }
}