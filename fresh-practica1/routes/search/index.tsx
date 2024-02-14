
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";

type Data={
  name?:string;
};

  
const Page = (props: PageProps<Data>) => {
    return (
        <div>
            <form method="get" action="/people">
            <input type="text" name="name"/>
            <button type="submit"> Enviar</button>  

            </form>
            
        </div>
    );
  };
  
  export default Page;