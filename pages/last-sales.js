import { useEffect, useState } from "react";
//import useSWR from "swr";

function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);
  const [isLoading, setIsLoading] = useState(false);

  //   const { data, error } = useSWR(
  //     "https://nextjs-course-5125c-default-rtdb.firebaseio.com/sales.json"
  //   );

  //   useEffect(() => {
  //     if (data) {
  //       const trasnformedSales = [];
  //       for (const key in data) {
  //         trasnformedSales.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume,
  //         });
  //       }
  //       setSales(trasnformedSales);
  //     }
  //   }, [data]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://nextjs-course-5125c-default-rtdb.firebaseio.com/sales.json`)
      .then((response) => response.json())
      .then((data) => {
        const trasnformedSales = [];
        for (const key in data) {
          trasnformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }
        setSales(trasnformedSales);
        setIsLoading(false);
      });
  }, []);

  //   if (error) {
  //     return <p>Failed to load</p>;
  //   }

  //   if (!data && !sales) {
  //     return <p>Loading...</p>;
  //   }

  //   if(!data || !sales){
  //     return <p>Loading...</p>
  //   }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!sales) {
    return <p>No data yet</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username}- ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

// export async function getStaticProps(props) {
//   const response = await fetch(
//     `https://nextjs-course-5125c-default-rtdb.firebaseio.com/sales.json`
//   );

//   const data = await response.json;

//   const trasnformedSales = [];
//   for (const key in data) {
//     trasnformedSales.push({
//       id: key,
//       username: data[key].username,
//       volume: data[key].volume,
//     });
//   }
//   return { props: { sales: trasnformedSales }, revalidate: 10 };
// }
export default LastSalesPage;
