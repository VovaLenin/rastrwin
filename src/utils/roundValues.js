export default function roundValues(arraysOfObjects, length) {
  // Перебираем каждый массив внутри основного массива
  for (let i = 0; i < arraysOfObjects.length; i++) {
    const arrayOfObjects = arraysOfObjects[i];

    // Перебираем каждый объект внутри массива
    for (let j = 0; j < arrayOfObjects.length; j++) {
      const obj = arrayOfObjects[j];

      // Перебираем все ключи (поля) объекта
      for (const key in obj) {
        if (obj.hasOwnProperty(key) && typeof obj[key] === "number") {
          const stringValue = obj[key].toString();

          // Проверяем, есть ли более двух знаков после запятой
          if (
            stringValue.includes(".") &&
            stringValue.split(".")[1].length > length
          ) {
            // Округляем значение до двух знаков после запятой
            obj[key] = parseFloat(obj[key].toFixed(length));
          }
        }
      }
    }
  }

  return arraysOfObjects;
}
