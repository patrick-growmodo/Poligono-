import React from 'react';
import MonthlyIterationChannel from './MonthlyIterationChannel';
import MonthlyIterations from './MonthlyIterations';

export default function MonthlyOverview() {
  return (
    <div className="bg-[#F5F7FA] dark:bg-[#11100D] mt-[10px] grid grid-cols-[30%_70%] gap-0">
     <MonthlyIterationChannel title="Monthly Iteration by Channel" icon="/images/icons/three-dots-dark.svg" />
     <MonthlyIterations title="Monthly Iterations" />

    </div>
  );
}
 