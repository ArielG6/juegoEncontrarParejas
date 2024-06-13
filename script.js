//Variables globales
const imagenes =[
    "Parejas/AnimalesSueltos.jpg",
    "Parejas/AnimalesSueltosTexto.jpg",
    "Parejas/CalzadaResbaladiza.jpg",
    "Parejas/CalzadaResbaladizaTexto.jpg",
    "Parejas/CedaElPaso.jpg",
    "Parejas/CedaElPasoTexto.jpg",
    "Parejas/CruceDePeatones.jpg",
    "Parejas/CruceDePeatonesTexto.jpg",
    "Parejas/CruceFerroviario.jpg",
    "Parejas/CruceFerroviarioTexto.jpg",
    "Parejas/DireccionesPermitidas.jpg",
    "Parejas/DireccionesPermitidasTexto.jpg",
    "Parejas/EstacionamientoPermitido.jpg",
    "Parejas/EstacionamientoPermitidoTexto.jpg",
    "Parejas/Estrechamiento.jpg",
    "Parejas/EstrechamientoTexto.jpg",
    "Parejas/LimitacionDeAltura.jpg",
    "Parejas/LimitacionDeAlturaTexto.jpg",
    "Parejas/LimiteDeVelocidadMaxima.jpg",
    "Parejas/LimiteDeVelocidadMaximaTexto.jpg",
    "Parejas/NoEstacionar.jpg",
    "Parejas/NoEstacionarTexto.jpg",
    "Parejas/NoGirarALaDerecha.jpg",
    "Parejas/NoGirarALaDerechaTexto.jpg",
    "Parejas/Pare.jpg",
    "Parejas/PareTexto.jpg",
    "Parejas/Rotonda.jpg",
    "Parejas/RotondaTexto.jpg"
  ];
  const descripcion = [
    "AnimalesSueltos",
    "AnimalesSueltos",
    "CalzadaResbaladiza",
    "CalzadaResbaladiza",
    "CedaElPaso",
    "CedaElPaso",
    "CruceDePeatones",
    "CruceDePeatones",
    "CruceFerroviario",
    "CruceFerroviario",
    "DireccionesPermitidas",
    "DireccionesPermitidas",
    "EstacionamientoPermitido",
    "EstacionamientoPermitido",
    "Estrechamiento",
    "Estrechamiento",
    "LimitacionDeAltura",
    "LimitacionDeAltura",
    "LimiteDeVelocidadMaxima",
    "LimiteDeVelocidadMaxima",
    "NoEstacionar",
    "NoEstacionar",
    "NoGirarALaDerecha",
    "NoGirarALaDerecha",
    "Pare",
    "Pare",
    "Rotonda",
    "Rotonda"
  ];
  let parejas = [];
  let figurai = "";
  let figuraj = "";
  let progreso = [];
  let dificultad = "";
  //Lógica de juego
  //Elección de señales
  function eleccionParejas(cantidad){
    parejas = [];
    progreso = [];
    while (parejas.length < cantidad ){
        let i = Math.floor(Math.random() * 28);
        if (!parejas.includes(i)){
          parejas.push(i);
          if(i%2 == 0){
            parejas.push(i+1);
          }else{
            parejas.push(i-1);
          }
        }
      }
  };

  //"Mezclado" de parejas
  function mezclado(){
    for (let i = parejas.length -1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i+1));
        let k = parejas[i];
        parejas[i] = parejas[j];
        parejas[j] = k;
        figurai = "#" + dificultad + i;
        $(figurai).attr("alt","?");
        $(figurai).attr("src","Parejas/Oculto.jpg");
      }
    $("#" + dificultad + "0").attr("alt","?");
    $("#" + dificultad + "0").attr("src","Parejas/Oculto.jpg");
    $("#final").text("Selecciona parejas");  
  }; 
 
  $(document).ready(function(){
    //Generación de jugadas
    $("#facil").click(function(){
      dificultad = "f";
      eleccionParejas(4)
      mezclado()   
      $("#tableroFacil").show();
      $("#tableroNormal").hide();
      $("#tableroDificil").hide();
      });
    });
    $("#normal").click(function(){
      dificultad = "n";
      eleccionParejas(8)
      mezclado()     
      $("#tableroFacil").hide();
      $("#tableroNormal").show();
      $("#tableroDificil").hide();
    });
    $("#dificil").click(function(){
      dificultad = "d";
      eleccionParejas(16)  
      mezclado()    
      $("#tableroFacil").hide();
      $("#tableroNormal").hide();
      $("#tableroDificil").show();
    });
     //Lógica de juego
    $(".pos").click(function(){
      let posicion = this.id;
      $(this).attr("src",imagenes[parejas[posicion.slice(1,posicion.length)]]);
      $(this).attr("alt",descripcion[parejas[posicion.slice(1,posicion.length)]]);
      setTimeout(
      () =>{
        for (let i=0; i < parejas.length-1; i++){
        figurai = "#" + dificultad + i;
        if($(figurai).attr("alt") != "?" && !progreso.includes(figurai)){
          for (let j=i+1; j < parejas.length; j++){
            figuraj = "#" + dificultad + j;
            if($(figuraj).attr("alt") != "?" && !progreso.includes(figuraj)){
              if ($(figurai).attr("alt") == $(figuraj).attr("alt")){
              progreso.push(figurai);
              progreso.push(figuraj);
              if (progreso.length == parejas.length){
                $("#final").text("¡Ganaste! Vuelve a elegir una dificultad para jugar de nuevo");
              }
            } else {
              $(figurai).attr("alt","?");
              $(figurai).attr("src","Parejas/Oculto.jpg");
              $(figuraj).attr("alt","?");
              $(figuraj).attr("src","Parejas/Oculto.jpg");
            }
            }
          }
        }   
      }    
      }
      ,500);
    });