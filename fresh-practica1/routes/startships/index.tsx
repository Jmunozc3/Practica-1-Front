import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";

type Data = {
    pagina: string;
    vector: Startship[];
}

type Startship = {
    name: string;
    manufacturer: string;
    model: string;
    cost_in_credits: string;
}

export const handler: Handlers<Data> = {
  async GET(_req: Request, ctx) {
    const url = new URL(_req.url);
    const page = url.searchParams.get("page") || '1';

    const response = await Axios.get(
        `https://swapi.dev/api/starships?page=${page}`,
      );

    return ctx.render({ pagina: page, vector: response.data.results });
  },
};

const Page = (props: PageProps<Data>) => {

  const { vector, pagina } = props.data;

  return (
    <div>
        <h1>Startships</h1>
      <ol>
        {vector.map((s) => (

            <li key={s.name}>
            <h2> Startship: {s.name}</h2>
            
            <p>Manufacter : {s.manufacturer}</p>
            <p>Model : {s.model}</p>
            <p>Cost in credicts : {s.cost_in_credits}</p>

          </li>
        ))}
      </ol>

      <div>


        <br>
        
        <form method="get" action="/startships">
            <input type="text" name="name"/>
            <button type="submit"> Enviar</button>  
            </form></br>   
        <br>

        {parseInt(pagina) > 1 && (
          <a href={`/startships?page=${parseInt(pagina) - 1}`}> Previous Page </a>

        )} &nbsp; | &nbsp;

        {parseInt(pagina) < 4 && (
          <a href={`/startships?page=${parseInt(pagina) + 1}`}> Next Page </a>

        )}

        
        </br>
      
      </div>

    </div>
  );
};

export default Page;