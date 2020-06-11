import React from "react";

interface BudgetProps {
    budget: number,
    currency: string,
    endDate: string,
};

interface BudgetState {

}

class Budget extends React.Component<BudgetProps, BudgetState> {
    render () {
        return (
            <>
                <h3>You've saved up {this.props.currency}{this.props.budget} for your item.</h3>
                <h2>Time To Buy: {this.props.endDate}</h2>
            </>
        );
    }
}

export default Budget;