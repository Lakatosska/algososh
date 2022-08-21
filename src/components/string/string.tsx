import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

export const StringComponent: React.FC = () => {
  return (
    <SolutionLayout title="Строка">
      <section className={styles.main}>
        <Input 
          maxLength={11}
          isLimitText
        />
        <Button 
          text='Развернуть'/>
      </section>

      <section className={styles.circles}>
        <Circle 
          letter='1'
          state = {ElementStates.Changing}
        />
        <Circle 
          letter='3'
        />
        <Circle
          letter='5'
          state = {ElementStates.Modified}
        />
        <Circle />
        <Circle />
        <Circle />
        <Circle />
        <Circle />
        <Circle />
        <Circle />
        <Circle />
      </section>
    </SolutionLayout>
  );
};
