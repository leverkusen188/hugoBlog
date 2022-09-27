import React, { Component } from "react";
import PropTypes from 'prop-types';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  NativeModules,NativeEventEmitter
} from "react-native";

import JSNativeView from './NativeView'


async function updateEvents() {
    try {
      const events = await NativeModules.TestObject.findEvents();
  
      console.log('events='+events)
    } catch (e) {
      console.error(e);
    }
}

class ModalApp extends Component {
  state = {
    modalVisible: false
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  jsTestFunc = (data) => {
    console.log('testFunc data='+data)
  }

  render() {
      console.log('modal start')
    const date = new Date('1995-12-17T03:24:00');
    NativeModules.TestObject.testFunc('11', '22', date.toISOString())
    NativeModules.TestObject.testParam('11', '22', {
        location: "aa",
        "bb" : 2,
    })
    NativeModules.TestObject.testCallback("1", (i, s, s2, i2) => {
        console.log('int='+i)
        console.log('string='+s)
        console.log('string2='+s2)
    }, (error) => {
        console.log('error='+error)
    })
    const eventListener = new NativeEventEmitter(NativeModules.TestObject)
    // console.log('start listen=')
    // const listener = eventListener.addListener("hello", (data) => {
    //     console.log("hello data="+data)
    // })
    // console.log('after listen=')
    updateEvents()
    const { modalVisible } = this.state;
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            console.log("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
          style={{width:50, height : 100}}
          removeClippedSubviews={true}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <JSNativeView
        style={{width:250, height:50, backgroundColor:"black"}} 
        userInteractionEnabled={true}
        onHello={ (event) => {
            console.log('event data='+event.first)
        }}
        >
        </JSNativeView>
        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text style={styles.textStyle}>Show Modal</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor:"red"
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "white",
    backgroundColor:"red"
  }
});

export default ModalApp;