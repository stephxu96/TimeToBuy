import React from "react";

interface BudgetProps {
    total: number,
    currency: string,
};

interface BudgetState {

}

class Budget extends React.Component<BudgetProps, BudgetState> {
    render () {
        return (
            <>
                        I am Budget
            </>
        );
    }
}

export default Budget;