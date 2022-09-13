import React, { ChangeEvent, useState, SyntheticEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./list-page.module.css";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { LinkedList } from "./utils";

const linkedList = new LinkedList(
  new Array(6)
    .fill('')
    .map(item => (item + Math.floor(Math.random() * 100)).toString())
);
console.log(linkedList)

export const ListPage: React.FC = () => {

  const [inputValue, setInputValue] = useState('');
  const [showList, setShowList] = useState<string[]>(linkedList.toString);
  const [index, setIndex] = useState('');
  const [smallCircleValue, setSmallCircleValue] = useState('');
  const [topCircleIndex, setTopCircleIndex] = useState(-1);
  const [bottomCircleIndex, setBottomCircleIndex] = useState(-1);
  const [modifiedIndex, setModifiedIndex] = useState(-1);
  const [changingIndexes, setChangingIndexes] = useState<number[]>([]);
  

  function addToHead() {
    if (!inputValue) return null;

    linkedList.prepend(inputValue);
    setTopCircleIndex(0);
    setSmallCircleValue(inputValue);

    setTimeout(() => {
      setShowList(linkedList.toString);
      setTopCircleIndex(-1);
      setSmallCircleValue('');
      setModifiedIndex(0);

      setTimeout(() => {
        setModifiedIndex(-1);
      }, 500);
    }, 500);
  }

  function addToTail() {
    if (!inputValue) return null;

    linkedList.append(inputValue);
    setTopCircleIndex(showList.length - 1);
    setSmallCircleValue(inputValue);

    setTimeout(() => {
      setShowList(linkedList.toString);
      setTopCircleIndex(-1);
      setSmallCircleValue('');
      setModifiedIndex(linkedList.toString.length - 1);

      setTimeout(() => {
        setModifiedIndex(-1);
      }, 500);
    }, 500);
  }

  function removeFromHead() {

    linkedList.deleteHead();
    setBottomCircleIndex(0);
    setSmallCircleValue(showList[0] as string);
    setShowList(
      showList.map((item, i) => {
        if (i === 0) {
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
      setSmallCircleValue('');
    }, 500);
  }

  function removeFromTail() {

    linkedList.deleteTail();
    setBottomCircleIndex(showList.length - 1);
    setSmallCircleValue(showList[showList.length - 1] as string);
    setShowList(
      showList.map((item, i) => {
        if (i === showList.length - 1) {
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
      setSmallCircleValue('');
    }, 500);
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
    setSmallCircleValue(inputValue);
    const arr: number[] = [];
    const interval = setInterval(() => {
      if (counter === parseInt(index)) {
        setTopCircleIndex(-1);
        setSmallCircleValue('');

        setChangingIndexes([]);
        setModifiedIndex(parseInt(index));
        setShowList(linkedList.toString);

        setTimeout(() => {
          setModifiedIndex(-1);
        }, 500);

        clearInterval(interval);
        return;
      }

      arr.push(counter);
      setChangingIndexes([...arr]);
      counter++;
      setTopCircleIndex(counter);
    }, 500);
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
        setSmallCircleValue(showList[parseInt(index)] as string);
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
          setSmallCircleValue('');
          setShowList(linkedList.toString);
        }, 500);
        return;
      }

      counter++;
      arr.push(counter);
      setChangingIndexes([...arr]);
    }, 500);
  }

  function applyCircleState(index: number): ElementStates {
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
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInputValue(e.target.value)
              }
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
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setIndex(e.target.value)
              }
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
        {showList.map((item, i) => {
          return (
            <div className={styles.mainCircles} key={i}>
              {i === topCircleIndex && (
                <Circle
                  letter={smallCircleValue}
                  extraClass={styles.topSmallCircle}
                  isSmall={true}
                  state={ElementStates.Changing}
                />
              )}
              <div className={styles.circleAndArrow} key={item}>
                <Circle
                  index={i}
                  letter={item}
                  tail={`${i === showList.length - 1 ? 'tail' : ''}`}
                  head={`${i === 0 ? 'head' : ''}`}
                  state={applyCircleState(i)}
                />
                {(i !== showList.length - 1) 
                    && <ArrowIcon />}
              </div>
              {i === bottomCircleIndex && (
                <Circle
                  letter={smallCircleValue}
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
}