import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";

type Data={
  name:string;
  height:string;
   mass:string;
   gender:string; 
   birth_year:string;
};

export const handler: Handlers<Data> = {
    async GET(_req: Request, ctx: FreshContext<unknown, Data>) {

      const url = new URL(_req.url)
      const name = url.searchParams.get("name") || "Luke";

      // llamar a la api
      
      const response = await Axios.get<Data>(

        `https://swapi.dev/api/people/?search=${name}`,
      );
      
      return ctx.render(response.data.results[0]);
    },
  };
  
  const Page = (props: PageProps<Data>) => {
    const character = props.data;
    return (
        <div>
            <h2>{character.name}</h2>
            <ul>
            <p>Height: {character.height}</p>
            <p>Mass: {character.mass}</p>
            <p>Gender: {character.gender}</p>
            <p>Birth_year:{character.birth_year}</p>

            </ul>
            
        </div>
    );
  };
  
  export default Page;