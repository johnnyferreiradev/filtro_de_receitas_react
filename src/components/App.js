import React, { Component } from 'react';
import Navbar from './Navbar'
import RecipeItem from './RecipeItem'
import recipes from '../sample_data/recipes.json'

class App extends Component {
  constructor(props) {
    super(props);

    this.recipes = recipes.results;
    this.state = {
      searchString: ''
    };
  }

  caseInsensitiveSearch(string, searchString) {
    return string.search(new RegExp(searchString, "i"))
  }

  recipesFilter (searchString) {
    const result = this.recipes.filter(rec => {
      return this.caseInsensitiveSearch(rec.title, searchString) !== -1 
        || this.caseInsensitiveSearch(rec.ingredients, searchString) !== -1
    })
    
    return result
  }

  updateField(event) {
    const newState = this.state
    newState.searchString = event.target.value
    this.setState({ newState })
  }

  render() {
    let filteredItems = this.recipesFilter(this.state.searchString);
    var result

    if(filteredItems.length > 0) {
      result = filteredItems.map((rec) => (
        <RecipeItem
          title={rec.title}
          thumbnail={rec.thumbnail}
          ingredients={rec.ingredients} />
      ))
    } else {
      result = <p className="col-12 text-center">No Results To Show</p>;
    }

    return (
      <div className="App">
        <Navbar value={this.state.searchString} change={e => this.updateField(e)} />
        <div className="container mt-10">
          <div className="row">
            {result}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
