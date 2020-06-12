import React from 'react';
import './App.css';
import { Budget, BudgetTotal, BudgetPanel, PaceSelector, ItemForm, ItemLine } from './common';
import { Grid, List } from '@material-ui/core'
;
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
  price: number;
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

  componentDidMount() {
    this.setState({ items: { "myItem": { startDate: "Default Start Date", recurrence: "Default recurrence", increment: 10, startAmount: 100,  price: 1000, endDate: "Default end date" }}});
  }

  updateItemList = (itemData: Item & { name: string }) => {
    let prevBudget = this.state.totalBudget;
    let { name, startDate, endDate, recurrence, increment, startAmount, price } = itemData;

    let items = this.state.items;
    items[name]= { startDate, endDate, recurrence, increment, startAmount, price };
    
    /* TODO: totalBudget should be pulling from this.state.items. Setting it here for testing */
    this.setState({ totalBudget: prevBudget + startAmount, items });
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
          <Grid container direction="column" alignItems="center">
            <List className={"Item-list"} dense={true}>
              {
                Object.keys(this.state.items).map((name) => {
                  return <ItemLine key={name} {...this.state.items[name]} />
                })
              }
            </List>
            <ItemForm className={"Item-list"} onChange={this.updateItemList} currency={this.state.currency} />
          </Grid>
      </div>
    );
  }
}

export default App;
