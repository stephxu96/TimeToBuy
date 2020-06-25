import React, { FunctionComponent } from "react";

const BudgetPanel: FunctionComponent = ({ children }) => {
    return (
        <div className="Top-panel">
            <div className="Top-panel-inner">
                {children}
            </div>
        </div>
    );
}

export default BudgetPanel;