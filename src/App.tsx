import React from 'react';
import './App.css';
import { Budget, BudgetTotal, BudgetPanel, PaceSelector, ItemForm, ItemLine } from './components';
import { Grid, List } from '@material-ui/core';

interface AppState {
  editItemMode: boolean;
  selectedItem: string | null;
  selectedBudget: number;
  currency: string;
  totalBudget: number;
  endDate: string;
  items: {
    [id: string]: Item
  };
};

export type id = string;

export interface Item {
  name: string;
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
    this.state = {
      editItemMode: false, 
      selectedItem: null, 
      currency: '$', 
      totalBudget: 100, 
      endDate: '', 
      selectedBudget: 0, 
      items: { "ID-01": { name: "Boat", startDate: "2019-09-20", recurrence: "Default recurrence", increment: 10, startAmount: 100, price: 1000, endDate: "9/15/2020" }}
    };
  }

  disableItemForm = () => this.setState({ editItemMode: true })

  updateItemBudget = (id: string, startAmount: number) => {
    let prevAmount = this.state.items[id] ? this.state.items[id].startAmount : 0;
    let prevBudget = this.state.totalBudget;
    let totalBudget = this.state.editItemMode ? 
                        prevBudget - prevAmount + startAmount : 
                        prevBudget + startAmount;
    console.log(startAmount, prevBudget);
    return totalBudget;
  }

  updateItemList = (id: string, itemData: Item) => {
    const totalBudget = this.updateItemBudget(id, itemData.startAmount);
    console.log(totalBudget);

    let items = this.state.items;
    items[id]= itemData;
    
    /* TODO: totalBudget should be pulling from this.state.items. Setting it here for testing */
    this.setState({ totalBudget, items, editItemMode: false, selectedItem: id });
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
            <List className={this.state.editItemMode ? "Item-form" : "Item-list"} dense={true}>
              {
                Object.keys(this.state.items).map((id: string) => {
                  return (
                      <ItemLine 
                          key={id}
                          id={id}
                          selected={id === this.state.selectedItem}
                          onEditClick={this.disableItemForm} 
                          onChange={this.updateItemList} 
                          onItemSelect={(id: string | null) => this.setState({ selectedItem: id })}
                          currency={this.state.currency} 
                          lineData={this.state.items[id]} 
                      />
                  );
                })
              }
            </List>
            <ItemForm 
              disabled={this.state.editItemMode} 
              className={"Item-form"} 
              onChange={this.updateItemList} 
              currency={this.state.currency} 
            />
          </Grid>
      </div>
    );
  }
}

export default App;
