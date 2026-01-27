import { get_data_rows } from "../services/localstorage";

function createReactiveStore(initial) {
  const listeners = new Set();

  function notify() {
    for (const l of listeners) l();
  }

  function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  function makeProxy(obj) {
    return new Proxy(obj, {
      get(target, prop) {
        const value = target[prop];
        // If nested object, make it reactive too
        if (value && typeof value === "object") {
          return makeProxy(value);
        }
        return value;
      },
      set(target, prop, value) {
        target[prop] = value;
        notify();
        return true;
      },
    });
  }

  return {
    state: makeProxy(initial),
    subscribe,
  };
}

const example_rows = [
  {
    id: 1,
    ln: "Doe",
    fn: "John",
    reason: "Checkup",
    date: "2023-10-01",
    tel: "1234567890",
    email: "john.doe@example.com",
  },
  {
    id: 2,
    ln: "Smith",
    fn: "Jane",
    reason: "Consultation",
    date: "2023-10-02",
    tel: "0987654321",
    email: "jane.smith@example.com",
  },
  {
    id: 3,
    ln: "Johnson",
    fn: "Bob",
    reason: "Follow-up",
    date: "2023-10-03",
    tel: "5555555555",
    email: "bob.johnson@example.com",
  },
  {
    id: 4,
    ln: "Brown",
    fn: "Alice",
    reason: "New Patient",
    date: "2023-10-04",
    tel: "4444444444",
    email: "alice.brown@example.com",
  },
  {
    id: 5,
    ln: "Davis",
    fn: "Charlie",
    reason: "Routine Check",
    date: "2023-10-05",
    tel: "3333333333",
    email: "charlie.davis@example.com",
  },
  {
    id: 6,
    ln: "Doe",
    fn: "John",
    reason: "Checkup",
    date: "2023-10-01",
    tel: "1234567890",
    email: "john.doe@example.com",
  },
  {
    id: 7,
    ln: "Smith",
    fn: "Jane",
    reason: "Consultation",
    date: "2023-10-02",
    tel: "0987654321",
    email: "jane.smith@example.com",
  },
  {
    id: 8,
    ln: "Johnson",
    fn: "Bob",
    reason: "Follow-up",
    date: "2023-10-03",
    tel: "5555555555",
    email: "bob.johnson@example.com",
  },
  {
    id: 9,
    ln: "Brown",
    fn: "Alice",
    reason: "New Patient",
    date: "2023-10-04",
    tel: "4444444444",
    email: "alice.brown@example.com",
  },
  {
    id: 10,
    ln: "Davis",
    fn: "Charlie",
    reason: "Routine Check",
    date: "2023-10-05",
    tel: "3333333333",
    email: "charlie.davis@example.com",
  },
];

const initial = {
  rows: [
    ...get_data_rows(),
     ...example_rows  
  ],
  current_page: 1,
  rows_per_page: 5,
};
const store = createReactiveStore(initial);
export { store };
