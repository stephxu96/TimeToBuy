import React from 'react';
import './App.css';
import { Budget, BudgetTotal, BudgetPanel, PaceSelector, ItemForm, ItemLine } from './common';
import { List } from '@material-ui/core'
;
import { truncate } from 'fs';
interface AppState {
  selectedItem: string | null;
  selectedBudget: number;
  currency: string;
  totalBudget: number;
  endDate: string;
  items: {
    [name: string]: Item
  };
};

export interface Item {
  startDate: string;
  recurrence: string;
  increment: number;
  startAmount: number;
  endDate: string;
};

class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);
    this.state = { selectedItem: null, currency: '$', totalBudget: 0, endDate: '', selectedBudget: 0, items: {}};
  }

  updateItemList = (itemData: Item & { name: string }) => {
    let prevBudget = this.state.totalBudget;
    let { name, startDate, endDate, recurrence, increment, startAmount } = itemData;

    let items = this.state.items;
    items[name]= { startDate, endDate, recurrence, increment, startAmount };
    
    /* TODO: totalBudget should be pulling from this.state.items. Setting it here for testing */
    this.setState({ totalBudget: prevBudget + startAmount, items });
    console.log(this.state);
  }

  render() {
    return (
      <div className="App">
          <BudgetPanel>
            { this.state.selectedItem !== null ?
                <Budget
                  budget={this.state.items[this.state.selectedItem].startAmount} 
                  endDate={this.state.items[this.state.selectedItem].endDate} 
                  currency={this.state.currency} 
                /> :
                <BudgetTotal 
                  total={this.state.totalBudget} 
                  currency={this.state.currency} 
                />  
            }
            <PaceSelector />
          </BudgetPanel>
          <List dense={true}>
            {
              Object.keys(this.state.items).map((name) => {
                return <ItemLine key={name} {...this.state.items[name]} />
              })
            }
          </List>
          <ItemForm onChange={this.updateItemList} currency={this.state.currency} />
      </div>
    );
  }
}

export default App;
