import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./fibonacci-page.module.css";

export const FibonacciPage: React.FC = () => {
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <main className={styles.main}>
        <Input 
          
          isLimitText
          max={19}
          type=''
         
        
        />
        <Button 
          text='Рассчитать'/>
      </main>
     
    </SolutionLayout>
  );
};
