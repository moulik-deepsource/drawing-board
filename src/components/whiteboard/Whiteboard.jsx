import React, {Component, createRef} from 'react';

export default class Whiteboard extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = createRef(null);
    this.enableDrawing = false;
  }

  componentDidMount() {
    const {lineCap, lineJoin, strokeStyle, lineWidth} = this.props;

    this.setBoardSize();
    const canvas = this.canvasRef.current;
    const context = canvas.getContext('2d');
    context.scale(2, 2);
    context.lineCap = lineCap;
    context.lineJoin = lineJoin;
    context.strokeStyle = strokeStyle;
    context.lineWidth = lineWidth;
    this.canvasRef.current = context;
  }

  setBoardSize = () => {
    const {width, height} = this.props;
    const canvas = this.canvasRef.current;
    canvas.width = width * 2;
    canvas.height = height * 2;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
  };

  handleMouseDown = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent;
    this.canvasRef.current.beginPath();
    this.canvasRef.current.moveTo(offsetX, offsetY);
    this.enableDrawing = true;
  };

  handleMouseMove = ({nativeEvent}) => {
    if (!this.enableDrawing) {
      return;
    }
    const {offsetX, offsetY} = nativeEvent;
    this.canvasRef.current.lineTo(offsetX, offsetY);
    this.canvasRef.current.stroke();
  };

  handleMouseUp = () => {
    this.canvasRef.current.closePath();
    this.enableDrawing = false;
  };

  render() {
    return (
      <canvas
        ref={this.canvasRef}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
      />
    );
  }
}