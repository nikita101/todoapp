import React, { Component } from 'react';
import './App.css';
import Todo from './components/Todo'
import Form from './components/Form'
import Background from './components/Background'


class App extends Component {
    // setting state
    state = {
        listItems: [
            {
                title: 'play piano',
                status: false,
            },
            {
                title: 'write a song',
                status: false,
            },
            {
                title: 'go for a walk',
                status: false,
            },
            {
                title: 'finish producing song',
                status: false,
            },
            {
                title: 'eat dinner',
                status: false,
            },
            {
                title: 'enjoy some tequila',
                status: false,
            }
        ],
        // setting default check box status to false
        completedStatus: false,
    }
    
    // selecting the selected items and recreating an array wihtout them
    chooseIfSelected = (status) => {
        let filteredArray = this.state.listItems.filter(eachListItem => {
            return eachListItem.status === this.state.completedStatus
        })
        this.setState({
            listItems: filteredArray
        })
    }
 // handing the adding of a new to do item
    handleAddToDo = (newToDo) => {
        let listItems = this.state.listItems;
        // pushing new item to the to do state
        listItems.push(newToDo);
        this.setState({ listItems: listItems });
    };
    // this function handles checking and unchecking item's check boxes.
    handleChange = (e) => {
        // get array list of items from state save in var.
        let listItems = this.state.listItems;
        // identify where to slice within the array, slice and save in new var
        let listItemsStart = listItems.slice(0, [e.target.id]);
        // creating new var that contains item of original array, changing that item to it's opposit state (unlchecked or checked)
        let updatedListItems = { ...listItems[e.target.id], status: !listItems[e.target.id].status };
        // creating a var to save the position of the item in the array and turning the id into an intiger from a string.
        let targOne = (parseInt(e.target.id) + 1);
        // creating a var to save where to slice the the item out of in the original array.
        let listItemsEnd = listItems.slice(targOne);
        // recreating a final, updated array out of where we sliced, updated and reconstructed the array and it's item.
        let finalListItems = [...listItemsStart, updatedListItems, ...listItemsEnd]
        // passing the recreated array to update state.
        this.setState({ listItems: finalListItems });
    }

    render() {
        return (
            <div >
                {/* calling background component */}
                <Background />
                {/* beginning of hte main container overlay */}
                <div className="container">
                    <div className="videocover" >
                        <div class="headercontainer"><h1 className="todotitle">Knockout List</h1></div>
                        {/* mapping the to do items in the state to the page */}
                        {this.state.listItems.map((todo, i) =>
                            <Todo
                                key={i}
                                title={todo.title}
                                status={todo.status}
                                id={i}
                                changeHandler={this.handleChange}
                            />
                        )}
                        {/* calling the form component */}
                        <Form addToDo={this.handleAddToDo} />
                        {/* button for clearing finished to do's */}
                        <div id="kobtn">
                            <button className="btn-lg btn-primary" onClick={() => this.chooseIfSelected(false)}> Knock Out! </button>
                            <p>{this.state.chooseIfSelected}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
