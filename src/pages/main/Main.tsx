import React from 'react';
import { Context } from 'shared/context/context';
import { Navigate } from 'react-router';
import { GlobalContext } from 'shared/context/context';
import CashFlow from 'widgets/cashFlow/CashFlow';
import { IncomeCard } from 'widgets/accountingСards/incomeCard/IncomeCard';
import { SpendingCard } from 'widgets/accountingСards/spendingCard/SpendingCard';
import { AccumulationCard } from 'widgets/accountingСards/accumulationCard/AccumulationCard';
import { BalanceCard } from 'widgets/accountingСards/balanceCard/BalanceCard';
import { AnalysisGraphs } from 'widgets/analysisGraphs/AnalysisGraphs';




const Main = () => {
    const { isLogin } = React.useContext<GlobalContext>(Context);

    if (!isLogin) return <Navigate to="/login" />;


    return (
        <>
            <section className="flex flex-col flex-1 gap-3 ">
                <div
                    className="flex flex-1  gap-3 w-full flex-col content-start
                    sm:flex-row sm:justify-center sm:flex-wrap   "
                >
                    <BalanceCard />
                    <IncomeCard />
                    <SpendingCard />
                    <AccumulationCard />
                </div>
                <div className="flex-1 w-full flex flex-col gap-3 md:flex-row">
                    <AnalysisGraphs />
                    <CashFlow />
                </div>
            </section>
        </>
    );
};

export default Main;
