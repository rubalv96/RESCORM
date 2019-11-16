import React, {Fragment} from 'react';
import '../assets/scss/main.scss';

export default class Piece extends React.Component {
  render(){

    let altoImg = 400;
    let anchoImg = 700;

    // Fabrico el tamaño del contenedor
    let anchoContenedor = anchoImg / this.props.conf.M;
    let altoContenedor = altoImg / this.props.conf.N;

    // Calculo de las posiciones de las fotos
    let top = -((this.props.posRow - 1) * altoImg / this.props.conf.N) + "px";
    let left = -((this.props.posCol - 1) * anchoImg / this.props.conf.M) + "px";

    // Color del borde de la piza dependiendo de si está seleccionada o no
    //   let piezaSeleccionada = false;
    //   let borde;
    //     console.log("Piezas seleccionada");
    //     console.log("PiezasSeleccionadas: " + this.props.piezasSeleccionadas);
    //   if((this.props.piezasSeleccionadas[0][0] === this.props.row && this.props.piezasSeleccionadas[0][0] === this.props.column)
    //     || (this.props.piezasSeleccionadas[1][0] === this.props.row && this.props.piezasSeleccionadas[1][1] === this.props.column)){
    //       piezaSeleccionada = true;
    //   }
    //   console.log("Pieza seleccionada= " + piezaSeleccionada);
    //   piezaSeleccionada ? borde = "7px yellow solid" : borde = "7px purple solid";
      let rowPieza = this.props.row;
      let colPieza = this.props.column;

      let rowSelec1 = this.props.piezasSeleccionadas[0][0];
      let colSelec1 = this.props.piezasSeleccionadas[0][1];
      let rowSelec2 = this.props.piezasSeleccionadas[1][0];
      let colSelec2 = this.props.piezasSeleccionadas[1][1];

      let borde = "";

      (rowPieza === rowSelec1 && colPieza === colSelec1) || (rowPieza === rowSelec2 && colPieza === colSelec2) ? borde = "4px yellow solid" : borde = "4px purple solid";

      console.log("PiezaSeleccionada: (" + rowSelec1 + "," + colSelec1 + "), (" + rowSelec2 + ", " + colSelec2 + ")");

    return (
      <Fragment>
        {/* <p>Pieza {this.props.posRow}.{this.props.posCol}</p>*/}
        <div
          style={{
            width:anchoContenedor + "px",
            height:altoContenedor + "px",
            overflow:"hidden",
            position:"relative",
            border:borde,
            borderRadius:"7px",

          }}
        >
          <img
            // className="imgPieza"
            style={{
              position:"absolute",
              left:left,
              top:top,
              margin:"auto",
              minHeight:"100%",
              minWidth:"100%",
              width:"700px",
              height:"400px",
            }}
            src={this.props.conf.image}
            onClick={()=>{
              this.props.seleccionarPieza(this.props.row, this.props.column);
              console.log("Has clickado en la pieza " + this.props.row + this.props.column +
                    " que corresponde a las pos: " + this.props.posRow + this.props.posCol);

            }}
          />
        </div>
      </Fragment>

    );
  }
}