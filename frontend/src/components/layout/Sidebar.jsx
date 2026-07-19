//This is just democode....

import { useState } from "react";

export default function StateDemo() {
    const [num, setNum] = useState(0);
    <button onClick={() => setNum(num+1)}>
        Increase
    </button>
    return (
        <div>
            <p>{num}</p>
        </div>
    );
}

