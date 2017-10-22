import React, {Component} from 'react';

class Tile extends Component {

    render() {
        return (
            <rect key={this.props.id}
                  width={this.props.width}
                  height={this.props.height}
                  fill={this.props.alive ? 'black' : 'white'}
                  stroke="black"
                  strokeWidth="1px"
                  x={this.props.x}
                  y={this.props.y}
                  i={this.props.i}
                  j={this.props.j}
                  onClick={this.props.click}
            >

            </rect>
        );
    }
}

export default Tile;