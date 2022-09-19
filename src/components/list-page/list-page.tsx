import React, { ChangeEvent, useState, SyntheticEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./list-page.module.css";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { LinkedList } from "./utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

const linkedList = new LinkedList(
  new Array(6).fill('').map(item => (item + Math.floor(Math.random() * 100)).toString())
);

export const ListPage: React.FC = () => {

  const [inputValue, setInputValue] = useState('');
  const [showList, setShowList] = useState<string[]>(linkedList.toString);
  const [index, setIndex] = useState('');
  const [extraCircleValue, setExtraCircleValue] = useState('');
  const [topCircleIndex, setTopCircleIndex] = useState(-1);
  const [bottomCircleIndex, setBottomCircleIndex] = useState(-1);
  const [modifiedIndex, setModifiedIndex] = useState(-1);
  const [changingIndexes, setChangingIndexes] = useState<number[]>([]);

  const onChangeValue = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  }

  const onChangeIndex = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setIndex(evt.target.value);
  }

  function addToHead() {
    if (!inputValue) return null;

    linkedList.prepend(inputValue);
    setTopCircleIndex(0);
    setExtraCircleValue(inputValue);

    setTimeout(() => {
      setShowList(linkedList.toString);
      setTopCircleIndex(-1);
      setExtraCircleValue('');
      setModifiedIndex(0);

      setTimeout(() => {
        setModifiedIndex(-1);
      }, SHORT_DELAY_IN_MS);
    }, SHORT_DELAY_IN_MS);
  }

  function addToTail() {
    if (!inputValue) return null;

    linkedList.append(inputValue);
    setTopCircleIndex(showList.length - 1);
    setExtraCircleValue(inputValue);

    setTimeout(() => {
      setShowList(linkedList.toString);
      setTopCircleIndex(-1);
      setExtraCircleValue('');
      setModifiedIndex(linkedList.toString.length - 1);

      setTimeout(() => {
        setModifiedIndex(-1);
      }, SHORT_DELAY_IN_MS);
    }, SHORT_DELAY_IN_MS);
  }

  function removeFromHead() {

    linkedList.deleteHead();
    setBottomCircleIndex(0);
    setExtraCircleValue(showList[0] as string);
    setShowList(
      showList.map((item, index) => {
        if (index === 0) {
          item = '';
          return item;
        } else {
          return item;
        }
      })
    );

    setTimeout(() => {
      setShowList(linkedList.toString);
      setBottomCircleIndex(-1);
      setExtraCircleValue('');
    }, SHORT_DELAY_IN_MS);
  }

  function removeFromTail() {

    linkedList.deleteTail();
    setBottomCircleIndex(showList.length - 1);
    setExtraCircleValue(showList[showList.length - 1] as string);
    setShowList(
      showList.map((item, index) => {
        if (index === showList.length - 1) {
          item = '';
          return item;
        } else {
          return item;
        }
      })
    );

    setTimeout(() => {
      setShowList(linkedList.toString);
      setBottomCircleIndex(-1);
      setExtraCircleValue('');
    }, SHORT_DELAY_IN_MS);
  }

  function addByIndex() {
    if (
      !index ||
      !inputValue ||
      parseInt(index) < 0 ||
      parseInt(index) >= showList.length
    ) {
      return null;
    }

    linkedList.addByIndex(inputValue, parseInt(index));
    let counter = 0;
    setTopCircleIndex(0);
    setExtraCircleValue(inputValue);
    const arr: number[] = [];
    const interval = setInterval(() => {
      if (counter === parseInt(index)) {
        setTopCircleIndex(-1);
        setExtraCircleValue('');

        setChangingIndexes([]);
        setModifiedIndex(parseInt(index));
        setShowList(linkedList.toString);

        setTimeout(() => {
          setModifiedIndex(-1);
        }, SHORT_DELAY_IN_MS);

        clearInterval(interval);
        return;
      }

      arr.push(counter);
      setChangingIndexes([...arr]);
      counter++;
      setTopCircleIndex(counter);
    }, SHORT_DELAY_IN_MS);
  }

  function removeByIndex() {
    if (!index || parseInt(index) < 0 || parseInt(index) >= showList.length) return null;

    linkedList.deleteByIndex(parseInt(index));
    const arr = [0];
    let counter = 0;
    setChangingIndexes([...arr]);

    const interval = setInterval(() => {
      if (counter === parseInt(index)) {
        setBottomCircleIndex(parseInt(index));
        setExtraCircleValue(showList[parseInt(index)] as string);
        arr.pop();
        setChangingIndexes([...arr]);
        setShowList(
          showList.map((item, i) => {
            if (i === parseInt(index)) {
              item = '';
              return item;
            } else {
              return item;
            }
          })
        );

        clearInterval(interval);

        setTimeout(() => {
          setChangingIndexes([]);
          setBottomCircleIndex(-1);
          setExtraCircleValue('');
          setShowList(linkedList.toString);
        }, SHORT_DELAY_IN_MS);
        return;
      }

      counter++;
      arr.push(counter);
      setChangingIndexes([...arr]);
    }, SHORT_DELAY_IN_MS);
  }

  function showColor(index: number): ElementStates {
    if (index === modifiedIndex) return ElementStates.Modified;
    if (changingIndexes.includes(index)) return ElementStates.Changing;
    return ElementStates.Default;
  }

  function handleFormSubmit(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    e.preventDefault();
  }

  return (
    <SolutionLayout title="Связный список">
      <section className={styles.form}>
        <form onSubmit={handleFormSubmit}>
          <div className={styles.value}>
            <Input 
              maxLength={4}
              isLimitText
              value={inputValue}
              onChange={onChangeValue}
            />
            <Button 
              text='Добавить в head'
              type="submit"
              onClick={addToHead}
            />
            <Button 
              text='Добавить в tail'
              type="submit"
              onClick={addToTail}
            />
            <Button 
              text='Удалить из head'
              type="submit"
              onClick={removeFromHead}
            />
            <Button 
              text='Удалить из tail'
              type="submit"
              onClick={removeFromTail}
            />
          </div>

          <div className={styles.index}>
            <Input 
              maxLength={1}
              placeholder='Введите индекс'
              value={index}
              onChange={onChangeIndex}
            />
            <Button 
              text='Добавить по индексу'
              type="submit"
              onClick={addByIndex}
            />
            <Button 
              text='Удалить по индексу'
              type="submit"
              onClick={removeByIndex}
            />
          </div>
        </form>
      </section>

      <section className={styles.circles}>
        {showList.map((item, index) => {
          return (
            <div className={styles.container} key={index}>
              {index === topCircleIndex && (
                <Circle
                  letter={extraCircleValue}
                  extraClass={styles.topSmallCircle}
                  isSmall={true}
                  state={ElementStates.Changing}
                />
              )}
              <div className={styles.circleAndArrow} key={item}>
                <Circle
                  index={index}
                  letter={item}
                  tail={`${index === showList.length - 1 ? 'tail' : ''}`}
                  head={`${index === 0 ? 'head' : ''}`}
                  state={showColor(index)}
                />
                {(index !== showList.length - 1) 
                    && <ArrowIcon />}
              </div>
              {index === bottomCircleIndex && (
                <Circle
                  letter={extraCircleValue}
                  extraClass={styles.bottomSmallCircle}
                  isSmall
                  state={ElementStates.Changing}
                />
              )}
            </div>
          )
        })}
      </section>
    </SolutionLayout>
  )
};