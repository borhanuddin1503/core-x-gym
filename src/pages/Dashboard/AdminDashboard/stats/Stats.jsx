import React from "react";
import TotalBalance from "./TotalBalance";
import LastTransection from "./LastTransection";
import Charts from "./Chart";

const Stats = () => {
    return (<div>
        <TotalBalance></TotalBalance>
        <LastTransection></LastTransection>
        <Charts></Charts>
    </div>)
}

export default Stats