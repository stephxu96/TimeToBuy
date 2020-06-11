import React from 'react';
import './App.css';
import { Budget, BudgetTotal, BudgetPanel, PaceSelector, ItemList } from './common'

interface AppState {
  itemSelected: boolean;
  currency: string;
};

class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);
    this.state = { itemSelected: false, currency: '$' }
  }

  render() {
    return (
      <div className="App">
          <BudgetPanel>
            { this.state.itemSelected ?
                <Budget total={2000} currency={this.state.currency} />
                :
                <BudgetTotal total={2000} currency={this.state.currency} />  
            }
            <PaceSelector />
          </BudgetPanel>
          <ItemList currency={this.state.currency} />
      </div>
    );
  }
}

export default App;
