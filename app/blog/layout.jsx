
import { NavBar } from "../NavBar";

export default function blogLayout({ children }) {
    return (

        <div className="bg-white">
            <NavBar />
            <div>{children}</div>

        </div>



    );
}
