/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var DreamTab = require('./dream-tab.ios');
var MeTab = require('./me-tab.ios');
var Icon = require('react-native-vector-icons/Ionicons');
var {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  TouchableHighlight,
  StatusBarIOS,
  NavigatorIOS,
  ActivityIndicatorIOS,
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
      selectedTab: 'dream'
    };
  },

  componentDidMount: function(){
    Icon.getImageSource('ios-gear', 30).then((source) => this.setState({ gearIcon: source })); 
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
      <TabBarIOS selectedTab={this.state.selectedTab}>
        <Icon.TabBarItem 
          style={styles.tab}
          title="梦想"
          selected={this.state.selectedTab ==='dream'}
          iconName="ios-home"
          selectedIconName="ios-home"
          onPress={()=>{
            this.setState({
              selectedTab: 'dream'
            });
          }}>
          <ListView 
            dataSource={this.state.dataSource}
            renderRow={this.renderDreams}
            style={styles.listView}>
          </ListView>
        </Icon.TabBarItem>

        <TabBarIOS.Item
          systemIcon="history"
          title="我"
          selected={this.state.selectedTab ==='me'}
          icon={{uri:'contacts'}}
          onPress={()=>{
            this.setState({
              selectedTab: 'me'
            });
          }}>
          <MeTab/>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },
  
  renderLoadingView: function(){
    return (
      <View style={styles.container}>
        <ActivityIndicatorIOS size="large"/>
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
  tab:{
    padding: 20,
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
  },
  wrapper: {
    borderRadius: 5,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#eeeeee',
    padding: 10,
  },
  icon:{
    height: 10,
    width: 10
  }
});


AppRegistry.registerComponent('DreamReact', () => DreamReact);
