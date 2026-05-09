// функция чтения из localstorage
export function loadState<T>(key: string): T | undefined {
  //  применяем дженерик, так как мы возвращаем некий тип
  // console.log(key); // userData
  try {
    const jsonState = localStorage.getItem(key);
    // console.log(jsonState);
    if (!jsonState) {
      // если ключа нет
      return undefined;
    }
    // если ключ есть - нам нужно его распарсить
    // console.log(JSON.parse(jsonState)); // {jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I…kzOX0.1jF68PtGoJIKuBRSNE7wsitQSOcpPNJFGD36CwTM1_Q'}
    return JSON.parse(jsonState);
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

// функция сохранения состояния в виде JSON

export function saveState<T>(state: T, key: string) {
  // console.log(state); // {jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I…YxMX0.RHAVZIwY7GiYwX4Xvl-SdSQSplGvH118nFSXnyIfj0Y'}
  // console.log(key); // userData
  const stringState = JSON.stringify(state);
  // console.log(stringState); // {"jwt":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTcyODQyMTY1NX0.9O-zZNtJYg1V1qaNluQ3MJC6Tocp3G-fO71ROzsAup0"}a
  localStorage.setItem(key, stringState);
}
