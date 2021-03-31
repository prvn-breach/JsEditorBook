import { useEffect } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "../components/resizable";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";

interface CodeCellProps {
    cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
    const { updateCell, createBundle } = useActions();
    const bundle = useTypedSelector((state) => state.bundles?.[cell.id]);

    useEffect(() => {
        const timer = setTimeout(async () => {
            createBundle(cell.id, cell.content);
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [cell.content, cell.id, createBundle]);

    return (
        <Resizable direction="vertical">
            <div style={{ height: "calc(100% - 10px)", display: "flex", flexDirection: "row" }}>
                <Resizable direction="horizontal">
                    <CodeEditor onChange={(value) => updateCell(cell.id, value)} initialValue="const a = 1" />
                </Resizable>
                {/* <textarea value={input} onChange={(e) => setInput(e.target.value)} /> */}
                {/* <div><button onClick={onClick}>Submit</button></div> */}
                {bundle && <Preview code={bundle.code} err={bundle.err} />}
            </div>
        </Resizable>
    );
}

export default CodeCell;