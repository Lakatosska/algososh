import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";

export const SortingPage: React.FC = () => {
  return (
    <SolutionLayout title="Сортировка массива">
      <main className={styles.main}>
        <div className={styles.radiobutton}>
          <RadioInput 
            label = "Выбор" 
          />
          <RadioInput 
            label = "Пузырёк" 
          />
        </div>
        <div className={styles.button}>
          <Button 
            text='По возрастанию'
            sorting={Direction.Ascending}
          />
          <Button 
            text='По убыванию'
            sorting={Direction.Descending}
          />
        </div>
        <Button 
          text='Новый массив'
        />
      </main>

    </SolutionLayout>
  );
};
