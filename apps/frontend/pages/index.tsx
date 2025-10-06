import type { NextPage } from 'next';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Home: NextPage = () => {
  const { data, error } = useSWR('/api/bookings', fetcher);

  if (error) return <div>Error loading bookings</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Bookings</h1>
      <ul>
        {data.map((b: any) => (
          <li key={b.id}>{b.id} - {new Date(b.date).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;