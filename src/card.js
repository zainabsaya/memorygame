

import React, { useState } from 'react';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    FlatList,
    View,
    TouchableOpacity,
} from 'react-native';
import Header from './componets/header';
export default class Card extends React.Component {
    constructor(props) {
        super(props);
        let cardData = [{
            name: "A",
            is_open: false
        },
        {
            name: "B",
            is_open: false
        },
        {
            name: "C",
            is_open: false
        }, {
            name: "D",
            is_open: false
        },
        {
            name: "E",
            is_open: false
        },
        {
            name: "F",
            is_open: false
        },
        {
            name: "G",
            is_open: false
        }, {
            name: "H",
            is_open: false
        }];
        let clone = JSON.parse(JSON.stringify(cardData));
        let cards = cardData.concat(clone);

        cards.map((obj) => {
            obj.id = Math.random().toString(36).substring(7);
        });
         let oldvalue = cards;
        this.state = {
            reset:oldvalue,

            currentIndex: [],
            selectedIndex: [],
            score: 0,
            cards: cards,
        }
    }




    cardClick = (id) => {

        let selected_pairs = this.state.selectedIndex;
        let current_selection = this.state.currentIndex;
        let score = this.state.score;
    
        let index = this.state.cards.findIndex((card) => {
          return card.id == id;
        });
    
        let cards = this.state.cards;

        console.log("indewx",index)

        if(cards[index].is_open == false && selected_pairs.indexOf(cards[index].name) === -1){

            cards[index].is_open = true;
            this.setState({cards:cards})
            current_selection.push({ 
              index: index,
              name: cards[index].name
            });

            if(current_selection.length == 2){
                if(current_selection[0].name == current_selection[1].name){
                  score += 1;
                  selected_pairs.push(cards[index].name);
                  current_selection = [];
                }else{
                    cards[current_selection[0].index].is_open = false;
                    this.setState({
                        cards: cards
                      });
                    setTimeout(() => {
                      cards[index].is_open = false;
                      this.setState({
                        cards: cards
                      });
                    }, 500);
                    current_selection = [];
                }
                this.setState({
                    score: score,
                    cards: cards,
                    currentIndex: current_selection
                  });
            }
        }      

    }

    cardItem(item) {
        return (
            <TouchableOpacity style={Styles.card} onPress={() => this.cardClick(item.id)}>
                <Text style={Styles.txt}>{item.is_open == true ? item.name : "name"}</Text>
            </TouchableOpacity>
        )
    }
    resetData =()=>{
      
       
        this.setState({
            cards:this.state.reset,
            score:0
        })
    }

    render() {
        console.log("this", this.state.cards)
        return (
            <View style={Styles.container}>
                <Header />

                <FlatList
                    data={this.state.cards}
                    renderItem={({ item }) =>
                        this.cardItem(item)}
                    numColumns={3}
                    keyExtractor={item => "_" + item.id}
                />
              
              <TouchableOpacity style={Styles.reset} onPress={()=>this.resetData()}>
                    <Text>RESET</Text>

                </TouchableOpacity>
                

                <TouchableOpacity style={Styles.reset}>

                    <Text>{this.state.score}</Text>  
                </TouchableOpacity>
                

            </View>
        )
    }
}


export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor:"pink"
    },
    card: {
        height: 150,
        // borderWidth:5,
        width: 100,
        padding: "5%",
        borderRadius: 5,
        margin: "2%",
        backgroundColor: "gray",
        justifyContent: 'center',
        alignItems: "center",
        elevation: 5

    },
    txt: {
        color: "yellow"
    },
    reset: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        backgroundColor: "pink"
    }
})