import React from "react";

interface BudgetTotalProps {
    total: number,
    currency: string,
};

const BudgetTotal = (props: BudgetTotalProps) => {
    return (
        <>
            <h4>Total Budget Available</h4>
            <h2>{props.currency}{props.total}</h2>
        </>
    );
}

export default BudgetTotal;