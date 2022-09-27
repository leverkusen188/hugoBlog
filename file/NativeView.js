import { requireNativeComponent } from 'react-native';
import PropTypes from 'prop-types';
import React, { Component } from "react";

class JSNativeView extends React.Component {
    _onHello1 = (event) => {
        console.log('onpress data='+event.nativeEvent.first)
      if (!this.props.onHello) {
        return;
      }
  
      // process raw event...
      this.props.onHello(event.nativeEvent);

    }
    render() {
        console.log('create native1')
      return (
          <NativeView style={{width:250, height:50, backgroundColor:"black"}} 
          frameTest={{x:1.1, y:2.3, width:50, height:40}} 
          onHello={this._onHello1}></NativeView>
      );
    }
};
const NativeView = requireNativeComponent('NativeView', JSNativeView);


JSNativeView.propTypes = {
  /**
   * A Boolean value that determines whether the user may use pinch
   * gestures to zoom in and out of the map.
   */
  userInteractionEnabled: PropTypes.bool,

  /**
   * 地图要显示的区域。
   *
   * 区域由中心点坐标和区域范围坐标来定义。
   *
   */
  frameTest: PropTypes.shape({
    /**
     * 地图中心点的坐标。
     */
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  onHello: PropTypes.func,
};

export default JSNativeView;

