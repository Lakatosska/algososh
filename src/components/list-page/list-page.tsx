import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./list-page.module.css";

export const ListPage: React.FC = () => {


  return (
    <SolutionLayout title="Связный список">
      <section className={styles.form}>

        <div className={styles.value}>
        
          <Input 
            maxLength={4}
            isLimitText
            
          />
          <Button 
            text='Добавить в head'
          />
          <Button 
            text='Добавить в tail'
          />
          <Button 
            text='Удалить из head'
          />
          <Button 
            text='Удалить из tail'
          />
        </div>

        <div className={styles.index}>
          <Input 
            maxLength={1}
            
          />
          <Button 
            text='Добавить по индексу'
          />
          <Button 
            text='Удалить по индексу'
          />
        </div>
      

      </section>

    </SolutionLayout>
  );
};
