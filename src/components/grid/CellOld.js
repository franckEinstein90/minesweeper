;

let buttonTag = c.bomb?c.bomb:c.neighborBombs>0?c.neighborBombs:" "
let className = ["cell"];

if( c.state === cells.states.stone ) {
    className.push( "stone" ); 
}  

if(c.state === cells.states.uncovered){
    className.push(c.bomb?"uncoveredBomb":"uncovered") ; 
} else { //tile is still covered
    className.push("covered") ; 
    if( grids.adjacentToUncovered( this.state.gridInfo, i, j ) ) className.push("selectable") ; 
    buttonTag = "" ; 
}
return (
 <div   className={className.join(' ')} 
        onClick={e => this.clickCellHandler(i,j)}
        key={c.id}>{buttonTag}</div>
)
