import { useState, useEffect } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import bundle from "../bundler";
import Resizable from "../components/resizable";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";

interface CodeCellProps {
    cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
    const [err, setErr] = useState('');
    const [code, setCode] = useState('');
    const { updateCell } = useActions();

    useEffect(() => {
        const timer = setTimeout(async () => {
            const output = await bundle(cell.content);
            setCode(output.code);
            setErr(output.err);
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [cell.content]);

    return (
        <Resizable direction="vertical">
            <div style={{ height: "calc(100% - 10px)", display: "flex", flexDirection: "row" }}>
                <Resizable direction="horizontal">
                    <CodeEditor onChange={(value) => updateCell(cell.id, value)} initialValue="const a = 1" />
                </Resizable>
                {/* <textarea value={input} onChange={(e) => setInput(e.target.value)} /> */}
                {/* <div><button onClick={onClick}>Submit</button></div> */}
                <Preview code={code} err={err} />
            </div>
        </Resizable>
    );
}

export default CodeCell;