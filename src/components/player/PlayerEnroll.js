import React, {useContext} from 'react';
import './PlayerEnroll.css';
class PlayerEnroll extends React.Component {

    constructor( props ) {
        super(props);
        this.state = {
            name:""
        }
        this.getPlayerInfo = this.getPlayerInfo.bind( this ); 
        this.handleChange = this.handleChange.bind( this ); 
    }

    handleChange( event ){
        this.setState({name: event.target.value})
    }

    getPlayerInfo(){
        this.props.storePlayerName(this.state.name)
    }

    render( ){
        return ( 
            <div className="PlayerEnroll"> 
                <div className="modal-content">  
                    <form onSubmit={this.getPlayerInfo}>
                        <input type="text" id="fname" 
                            value={this.state.name} 
                            onChange={this.handleChange} 
                            name="playerName" placeholder="Your name.."/>
                        <input type="submit" value="PLAY"/>
                    </form> 
                </div>
           </div>
        )
    }

}

export default PlayerEnroll; 