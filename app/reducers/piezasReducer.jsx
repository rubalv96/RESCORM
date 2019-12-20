function piezasReducer(state = [], action){
    switch (action.type){
        case 'INICIAR_PUZZLE':
            return action.piezas;
        case 'INTERCAMBIAR_PIEZAS':
            var ind1 = -1;
            var ind2 = -1;

            var piezas = Object.assign([], state);
            for ( var l = 0; l < piezas.length; l ++){
                if (piezas[l].row === action.payload.row1 && piezas[l].column === action.payload.col1){
                    ind1 = l;
                }
                if(piezas[l].row === action.payload.row2 && piezas[l].column === action.payload.col2){
                    ind2 = l;
                }
                console.log(piezas[l].row);
            }
            console.log("ind1 es: "+ ind1);
            console.log("ind2 es: "+ ind2);
            var posRow1 = piezas[ind1].posRow;
            var posRow2 = piezas[ind2].posRow;

            var posCol1 = piezas[ind1].posCol;
            var posCol2 = piezas[ind2].posCol;
            console.log("ANTES posrow : " +piezas[ind1].posRow )

            piezas[ind1].posRow = posRow2;
            piezas[ind2].posRow = posRow1;
            piezas[ind1].posCol = posCol2;
            piezas[ind2].posCol = posCol1;
            console.log("DESPUÉS posrow : " +piezas[ind1].posRow )

            console.log("FINAL!");
            console.log(piezas);
            return piezas;


        default:
            return state;
    }
}



export default piezasReducer;