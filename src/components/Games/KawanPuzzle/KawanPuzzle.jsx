import "./puzzle.css";
import { JigsawPuzzle } from "react-jigsaw-puzzle/lib";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";
import img from "./mahfuzDPFB.jpg";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

function App() {
    const text = "UNPUZZLE THE PIECES!!";
    const { userDb } = useContext(AuthContext);

    const set = () => {
        Swal.fire({
            title: `Congratulations, ${userDb.name} 😍 <br>You solve it!!`,
            icon: "success",
            draggable: true
        });

    };

    return (
        <div className="bg-gradient-to-br from-black to-purple-700 pb-14">
            <h2 className="text-4xl font-bold tag">{text}</h2>
            <JigsawPuzzle
                imageSrc={img}
                rows={3}
                columns={3}
                onSolved={set}
                className="jigsaw-puzzle"
            />
        </div>
    );
}

export default App;
