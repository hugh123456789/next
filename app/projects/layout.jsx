
import { NavBar } from "../NavBar";

export default function projectLayout({ children }) {
    return (

        <div >
            <NavBar />
            <div>{children}</div>

        </div>



    );
}
