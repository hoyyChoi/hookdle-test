import { useMemo, useState } from 'react';

interface UserDefinedArraySetterNameType<T> {
  set: (newArray: T[]) => void;
  push: (...newValues: T[]) => void;
  pop: () => void;
  clear: () => void;
  shift: () => void;
  unshift: (...newValues: T[]) => void;
  splice: (startIndex: number, deleteCount: number, ...newValues: T[]) => void;
  insertAt: (startIndex: number, ...newValues: T[]) => void;
  removeAt: (deleteIndex: number) => void;
  updateAt: (updateIndex: number, updateValue: T) => void;
}

type userArrayStateReturn<T> = [T[], UserDefinedArraySetterNameType<T>];

export function useArrayState<T>(initialValue: T[] | (() => T[])): userArrayStateReturn<T> {
  const [value, setValue] = useState<T[]>(initialValue);

  const userDefinedArraySetterName: UserDefinedArraySetterNameType<T> = useMemo(
    () => ({
      set: (newArray) => {
        setValue(newArray);
      },
      push: (...newValues) => {
        setValue((prev) => [...prev, ...newValues]);
      },
      pop: () => {
        setValue((prev) => prev.slice(0, -1));
      },
      clear: () => {
        setValue([]);
      },
      shift: () => {
        setValue((prev) => prev.slice(1));
      },
      unshift: (...newValues) => {
        setValue((prev) => [...newValues, ...prev]);
      },
      splice: (startIndex, deleteCount, ...newValues) => {
        setValue((prev) => {
          const newArray = [...prev];
          newArray.splice(startIndex, deleteCount, ...newValues);
          return newArray;
        });
      },
      insertAt: (startIndex, ...newValues) => {
        setValue((prev) => {
          const newArray = [...prev];
          newArray.splice(startIndex, 0, ...newValues);
          return newArray;
        });
      },
      removeAt: (deleteIndex) => {
        setValue((prev) => {
          const newArray = [...prev];
          newArray.splice(deleteIndex, 1);
          return newArray;
        });
      },
      updateAt: (updateIndex, updateValue) => {
        setValue((prev) => {
          const newArray = [...prev];
          newArray.splice(updateIndex, 1, updateValue);
          return newArray;
        });
      },
    }),
    []
  );

  return [value, userDefinedArraySetterName];
}

/**
 * 사용자한테 받을 배열의 기능은
 * 1. set: 새로운 배열을 할당하는 기능
 * 1. push: 새로운 값을 배열에 추가하는 기능
 * 2. pop: 배열의 마지막 값을 제거하는 기능
 * 3. clear: 배열을 비우는 기능
 * 4. shift: 배열을 맨 앞의 값을 제거하는 기능
 * 5. unshift: 배열의 맨 앞에 새로운 값을 추가하는 기능
 * 6. splice: 배열의 특정 위치에 값을 추가하거나 제거하는 기능
 * 7. insertAt: 배열의 특정 위치에 값을 추가하는 기능
 * 8. removeAt: 배열의 특정 위치에 값을 제거하는 기능
 * 9. updateAt: 배열의 특정 위치에 값을 대체하는 기능
 */

/**
 * const [value, arrayActions] = useArrayState(initialArray);
 * 1. arrayActions.set([1,2,3]); // 기존 배열을 없애고 새로운 배열을 할당
 * 1. arrayActions.push(1,2,3); // 배열에 새로운 값을 추가
 * 2. arrayActions.pop(); // 배열의 마지막 값을 제거
 * 3. arrayActions.clear(); // 배열을 비우기
 * 4. arrayActions.shift(); // 배열의 맨 앞의 값을 제거
 * 5. arrayActions.unshift(0); // 배열의 맨 앞에 새로운 값을 추가
 * 6. arrayActions.splice(1, 2); // 배열의 특정 위치에 값을 추가하거나 제거
 * 7. arrayActions.insertAt(1, 4); // 배열의 특정 위치에 값을 추가
 * 8. arrayActions.removeAt(1); // 배열의 특정 위치에 값을 제거
 * 9. arrayActions.updateAt(1, 5); // 배열의 특정 위치에 값을 대체
 */
