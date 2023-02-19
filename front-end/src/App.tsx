import { useEffect, useState } from 'react';
import Animal from './Animal';
import './App.css';

function useAnimalSearch() {
  const [animals, setAnimals] = useState([]);
  const search = async (q: string) => {
    const response = await fetch(`http://localhost:8080?${new URLSearchParams({q})}`);
    console.log(`http://localhost:8080?${new URLSearchParams({q})}`);
    const data = await response.json();
    setAnimals(data);

    localStorage.setItem("lastQuery", q);
  }

  useEffect(() => {
    const lastQuery = localStorage.getItem("lastQuery");
    search(lastQuery as string);
  }, []);
  
  return { search, animals };
}

export default function App() {
  const { search, animals } = useAnimalSearch();

  return (
    <main>
      <h1></h1>
      <input type="text" placeholder="Search" onChange={event => search(event.target.value)} />
      <ul>
        {animals.map(animal => (
          <Animal key={animal.id} {...animal as any} />
        ))}
        {animals.length === 0 && "No animals found"}
      </ul>
    </main>
  );
}
