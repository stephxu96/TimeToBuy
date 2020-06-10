import React from "react";

interface BudgetProps {
    total: number,
    currency: string,
};

function Budget (budget: BudgetProps) {
    return (
        <div className="Top-panel">
            <div className="Top-panel-inner">
                <h1>Total Budget Available</h1>
                <h1>{budget.currency}{budget.total}</h1>
            </div>
        </div>
    );
}

export default Budget;