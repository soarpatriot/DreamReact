/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  Image,
  ListView,
  Text,
  View,
} = React;
var DREAM_URL = 'http://api.dreamreality.cn/v1/posts.json';

var DreamReact = React.createClass({
  getInitialState: function(){
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged:(row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function(){
    this.fetchData(); 
  },
  fetchData: function(){
    fetch(DREAM_URL)
      .then((response)=> response.json())
      .then((responseData) =>{
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.data),
          loaded: true,
        });
      })
      .done();
  },
  render: function() {
    if(!this.state.loaded){
      return this.renderLoadingView(); 
    }
    return (
      <ListView 
        dataSource={this.state.dataSource}
        renderRow={this.renderDreams}
        style={styles.listView}>
      </ListView>
    );
  },
  
  renderLoadingView: function(){
    return (
      <View style={styles.container}>
        <Text>
          Loading dreams...

        </Text>
      </View> 
    ); 
  },
  renderDreams: function(dream){
    return (
      <View style={styles.container}>
          <Text style={styles.title}>{dream.dream}</Text>
      </View> 
    ); 
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    height: 100
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  title:{
    fontSize: 14,
    textAlign: 'left',
  },
  listView: {
    paddingTop:20 
  }
});


AppRegistry.registerComponent('DreamReact', () => DreamReact);
