import React from 'react';
import {Fragment} from 'react';
import Piece from "./Piece";
import '../assets/scss/main.scss';
import * as Utils from '../vendors/Utils';
import {addObjectives} from "../reducers/actions";
import ImagesCropper from "./ImagesCropper";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
let GLOBAL_CONFIG = require('../config/config.js');

export default class Puzzle extends React.Component {

    constructor(props){
        super(props);
        this.mostrarTooltip = this.mostrarTooltip.bind(this);
    }

    render(){

        let rows = []; // rows=[1,2,3,4,5,...,N]
        for(let i = 1; i <= this.props.conf.N; i++){
            rows.push(i);
        }
        let columns = []; // rows=[1,2,3,4,5,...,N]
        for(let i = 1; i <= this.props.conf.M; i++){
            columns.push(i);
        }

        let rowsE = []; // rows=[1,2,3,4,5,...,N]
        for(let i = 1; i <= this.props.conf.Nextra; i++){
            rowsE.push(i);
        }
        let columnsE = []; // rows=[1,2,3,4,5,...,N]
        for(let i = 1; i <= this.props.conf.Mextra; i++){
            columnsE.push(i);
        }

        let l = -1, k = -1, m = -1, n = -1, o = -1, p = -1;


                    let areaPuzzle;
                    areaPuzzle =
                    (<>
                    <h2 className="msgPrint">Área de puzzle</h2>
                    <table className={"tablePuzzle"}>
                        <tbody>
                        {rows.map((row, ind) => {
                            return (
                                <tr key={ind}>
                                    {columns.map((col, indC) => {
                                        l++;
                                        return (
                                            <Fragment key={indC}>

                                                <td>
                                                    <Piece posRow={this.props.piezas[l].posRow}
                                                           posCol={this.props.piezas[l].posCol}
                                                           row={this.props.piezas[l].row}
                                                           column={this.props.piezas[l].column}
                                                           conf={this.props.conf}
                                                           seleccionarPieza={this.props.seleccionarPieza}
                                                           piezasSeleccionadas={this.props.piezasSeleccionadas}
                                                           numPuzzle={this.props.piezas[l].numPuzzle}
                                                           darVuelta = {this.props.darVuelta}
                                                           imagen = {this.props.piezas[l].imgSol}
                                                           imagenRev = {this.props.piezas[l].imgRev}
                                                           imagenExtra = {this.props.piezas[l].imgExtra}
                                                           imagenExtraRev = {this.props.piezas[l].imgExtraRev}
                                                           lupa={this.props.lupa}

                                                    />
                                                </td>
                                            </Fragment>);
                                    })}

                                </tr>);
                        })}
                        </tbody>
                    </table>
                </>);
                    let areaPiezasExtra = "";
                    if(!(this.props.conf.Nextra === 0 || this.props.conf.Mextra === 0 || this.props.conf.imageExtra1 === "")){
                    areaPiezasExtra = (
                        <>
                            <h2 className="msgPrint">Área de piezas extra</h2>
                            <table className={"tablePuzzle extra"}>
                                <tbody>
                                {rowsE.map((row, ind) => {
                                    return (
                                        <tr key={ind}>
                                            {columnsE.map((col, indC) => {
                                                k++;
                                                return (
                                                    <Fragment key={indC}>
                                                        <td>
                                                            <Piece posRow={this.props.piezas[k + this.props.conf.N * this.props.conf.M].posRow}
                                                                   posCol={this.props.piezas[k + this.props.conf.N * this.props.conf.M].posCol}
                                                                   row={this.props.piezas[k + this.props.conf.N * this.props.conf.M].row}
                                                                   column={this.props.piezas[k + this.props.conf.N * this.props.conf.M].column}
                                                                   conf={this.props.conf}
                                                                   seleccionarPieza={this.props.seleccionarPieza}
                                                                   piezasSeleccionadas={this.props.piezasSeleccionadas}
                                                                   numPuzzle={this.props.piezas[k + this.props.conf.N * this.props.conf.M].numPuzzle}
                                                                   darVuelta = {this.props.darVuelta}
                                                                   imagen = {this.props.piezas[k + this.props.conf.N * this.props.conf.M].imgSol}
                                                                   imagenRev = {this.props.piezas[k + this.props.conf.N * this.props.conf.M].imgRev}
                                                                   imagenExtra = {this.props.piezas[k].imgExtra}
                                                                   imagenExtraRev = {this.props.piezas[k].imgExtraRev}
                                                                   lupa={this.props.lupa}
                                                                   extraArea
                                                            />
                                                        </td>
                                                    </Fragment>);
                                            })}
                                        </tr>);
                                })}
                                </tbody>
                            </table>
                        </>
                    );
                }
                    let areaPuzzlePrint;
                    areaPuzzlePrint =
                    (
                    <>
                        <h2 className="msgPrint">Área de puzzle</h2>
                        <table className={"tablePrint"}>
                            <tbody>
                            {rows.map((row, ind) => {
                                return (
                                    <tr key={ind}>
                                        {columns.map((col, indC) => {
                                            o++;
                                            return (
                                                <Fragment key={indC}>
                                                    <td>
                                                        <Piece posRow={this.props.piezas[o].posRow}
                                                               posCol={this.props.piezas[o].posCol}
                                                               row={this.props.piezas[o].row}
                                                               column={this.props.piezas[o].column}
                                                               conf={this.props.conf}
                                                               seleccionarPieza={this.props.seleccionarPieza}
                                                               piezasSeleccionadas={this.props.piezasSeleccionadas}
                                                               numPuzzle={this.props.piezas[o].numPuzzle}
                                                               darVuelta = {this.props.darVuelta}
                                                               piezaExtra = {this.props.piezas[o].piezaExtra}
                                                               imagen = {this.props.piezas[o].imgSol}
                                                               imagenRev = {this.props.piezas[o].imgRev}
                                                               imagenExtra = {this.props.piezas[o].imgExtra}
                                                               imagenExtraRev = {this.props.piezas[o].imgExtraRev}
                                                        />
                                                    </td>
                                                </Fragment>);
                                        })}
                                    </tr>);
                            })}
                            </tbody>
                        </table>
                    </>
                    );
                    let areaPuzzleExtraPrint;
                    areaPuzzleExtraPrint =
                    (
                    <>
                        <h2 className="msgPrint">Área de piezas extra</h2>
                        <table className={"tablePrint"}>
                            <tbody>
                            {rowsE.map((row, ind) => {
                                return (
                                    <tr key={ind}>
                                        {columnsE.map((col, indC) => {
                                            p++;
                                            return (
                                                <Fragment key={indC}>
                                                    <td>
                                                        <Piece posRow={this.props.piezas[p + this.props.conf.N * this.props.conf.M].posRow}
                                                               posCol={this.props.piezas[p + this.props.conf.N * this.props.conf.M].posCol}
                                                               row={this.props.piezas[p + this.props.conf.N * this.props.conf.M].row}
                                                               column={this.props.piezas[p + this.props.conf.N * this.props.conf.M].column}
                                                               conf={this.props.conf}
                                                               seleccionarPieza={this.props.seleccionarPieza}
                                                               piezasSeleccionadas={this.props.piezasSeleccionadas}
                                                               numPuzzle={this.props.piezas[p].numPuzzle}
                                                               darVuelta = {this.props.darVuelta}
                                                               piezaExtra = {this.props.piezas[p + this.props.conf.N * this.props.conf.M].piezaExtra}
                                                               imagen = {this.props.piezas[p + this.props.conf.N * this.props.conf.M].imgSol}
                                                               imagenRev = {this.props.piezas[p + this.props.conf.N * this.props.conf.M].imgRev}
                                                               imagenExtra = {this.props.piezas[p].imgExtra}
                                                               imagenExtraRev = {this.props.piezas[p].imgExtraRev}
                                                        />
                                                    </td>
                                                </Fragment>);
                                        })}
                                    </tr>);
                            })}
                            </tbody>
                        </table>
                    </>
                    );
                    let areaPuzzlePrintReverso = "";
                    if(this.props.conf.image2 !== ""){
                    areaPuzzlePrintReverso = (
                        <>
                            <div className="pagebreak" />
                            <h1 className="title titlePrint">{this.props.conf.title}</h1>
                            <h2 className="msgPrint">Área de puzzle</h2>
                            <table className="tablePrint">
                                <tbody>
                                {rows.map((row, ind) => {
                                    return (
                                        <tr key={ind}>
                                            {columns.map((col, indC) => {
                                                m++;
                                                let numP1;
                                                this.props.piezas[m].numPuzzle === 1 ? numP1 = 2 : numP1 = 1;
                                                return (
                                                    <Fragment key={indC}>
                                                        <td>
                                                            <Piece posRow={this.props.piezas[m].posRow}
                                                                   posCol={this.props.piezas[m].posCol}
                                                                   row={this.props.piezas[m].row}
                                                                   column={this.props.piezas[m].column}
                                                                   conf={this.props.conf}
                                                                   seleccionarPieza={this.props.seleccionarPieza}
                                                                   piezasSeleccionadas={this.props.piezasSeleccionadas}
                                                                   numPuzzle={numP1}
                                                                   darVuelta = {this.props.darVuelta}
                                                                   piezaExtra = {this.props.piezas[m].piezaExtra}
                                                                   imagen = {this.props.piezas[m].imgSol}
                                                                   imagenRev = {this.props.piezas[m].imgRev}
                                                                   imagenExtra = {this.props.piezas[m].imgExtra}
                                                                   imagenExtraRev = {this.props.piezas[m].imgExtraRev}
                                                            />
                                                        </td>
                                                    </Fragment>);
                                            })}
                                        </tr>);
                                })}
                                </tbody>
                            </table>
                        </>
                    );
                }
                    let areaPuzzleExtraPrintReverso = "";
                    if(this.props.conf.imageExtra1 !== "" && this.props.conf.image2 !== ""){
                    areaPuzzleExtraPrintReverso = (
                        <>
                            <h2 className="msgPrint">Área de piezas extra</h2>
                            <table className={"tablePrint"}>
                                <tbody>
                                {rowsE.map((row, ind) => {
                                    return (
                                        <tr key={ind}>
                                            {columnsE.map((col, indC) => {
                                                n++;
                                                let numP2;
                                                this.props.piezas[n + this.props.conf.N * this.props.conf.M].numPuzzle === 1 ? numP2 = 2 : numP2 = 1;
                                                return (
                                                    <Fragment key={indC}>
                                                        <td>
                                                            <Piece posRow={this.props.piezas[n + this.props.conf.N * this.props.conf.M].posRow}
                                                                   posCol={this.props.piezas[n + this.props.conf.N * this.props.conf.M].posCol}
                                                                   row={this.props.piezas[n + this.props.conf.N * this.props.conf.M].row}
                                                                   column={this.props.piezas[n + this.props.conf.N * this.props.conf.M].column}
                                                                   conf={this.props.conf}
                                                                   seleccionarPieza={this.props.seleccionarPieza}
                                                                   piezasSeleccionadas={this.props.piezasSeleccionadas}
                                                                   numPuzzle={numP2}
                                                                   darVuelta = {this.props.darVuelta}
                                                                   piezaExtra = {this.props.piezas[n + this.props.conf.N * this.props.conf.M].piezaExtra}
                                                                   imagen = {this.props.piezas[n + this.props.conf.N * this.props.conf.M].imgSol}
                                                                   imagenRev = {this.props.piezas[n + this.props.conf.N * this.props.conf.M].imgRev}
                                                                   imagenExtra = {this.props.piezas[n].imgExtra}
                                                                   imagenExtraRev = {this.props.piezas[n].imgExtraRev}
                                                            />
                                                        </td>
                                                    </Fragment>);
                                            })}
                                        </tr>);
                                })}
                                </tbody>
                            </table>
                        </>
                    );
                }
                    return (
                    <>
                        <div className={"puzzleArea"} style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                            {/* Componente de área de juego del puzzle*/}
                            {areaPuzzle}
                            {/* Componente de área de piezas extra*/}
                            {areaPiezasExtra}
                        </div>
                        {/* <Toolkit comprobarCompletado={this.props.comprobarCompletado}*/}
                        {/*  conf = {this.props.conf}*/}
                        {/*  toggle = {this.props.toggle}*/}
                        {/* />*/}
                        {/* Componentes visibles solo en versión de impresión en papel*/}
                        {areaPuzzlePrint}
                        {areaPuzzleExtraPrint}
                        {areaPuzzlePrintReverso}
                        {areaPuzzleExtraPrintReverso}

                        {/*<ImagesCropper*/}
                        {/*    imagen={GLOBAL_CONFIG.image1}*/}
                        {/*    piezas={this.props.piezas}*/}
                        {/*    dispatch={this.props.dispatch}*/}
                        {/*    imagenes={"imagenes"}*/}
                        {/*/>*/}
                        {/*<ImagesCropper*/}
                        {/*    imagen={GLOBAL_CONFIG.image2}*/}
                        {/*    piezas={this.props.piezas}*/}
                        {/*    dispatch={this.props.dispatch}*/}
                        {/*    imagenes={"imagenesRev"}*/}
                        {/*/>*/}
                        {/*<ImagesCropper*/}
                        {/*    imagen={GLOBAL_CONFIG.imageExtra1}*/}
                        {/*    piezas={this.props.piezas}*/}
                        {/*    dispatch={this.props.dispatch}*/}
                        {/*    imagenes={"imagenesExtra"}*/}
                        {/*/>*/}
                        {/*<ImagesCropper*/}
                        {/*    imagen={GLOBAL_CONFIG.imageExtra2}*/}
                        {/*    piezas={this.props.piezas}*/}
                        {/*    dispatch={this.props.dispatch}*/}
                        {/*    imagenes={"imagenesExtraRev"}*/}
                        {/*/>*/}
                    </>
                    );
                    }
                    mostrarTooltip(imagen, factorZoom){
                    console.log("Mostrando Tooltip");
                    let anchoImg = 700;
                    let altoImg = 430;
                    let anchoPieza= 700/GLOBAL_CONFIG.M;
                    let altoPieza= 430/GLOBAL_CONFIG.N;

                    let anchoPiezaZoom = anchoPieza * factorZoom;
                    let altoPiezaZoom = altoPieza * factorZoom;

                    let width = anchoPiezaZoom.toString() + "px";
                    let height = altoPiezaZoom.toString() + "px";

                    return <Tooltip ><img src={imagen} style={{width: width, height: height}}/></Tooltip>;



                }
                    componentDidMount(){
                    let objectives = [];
                    objectives.push(new Utils.Objective({id:(1), progress_measure:(1), score:(1)}));
                    this.props.dispatch(addObjectives(objectives));
                }
                    }
