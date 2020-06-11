import React from "react";

interface BudgetTotalProps {
    total: number,
    currency: string,
};

const BudgetTotal = (props: BudgetTotalProps) => {
    return (
        <>
            <h3>Total Budget Available</h3>
            <h2>{props.currency}{props.total}</h2>
        </>
    );
}

export default BudgetTotal;