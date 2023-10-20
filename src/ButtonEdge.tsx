import { BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath } from 'reactflow';

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const onEdgeClick = (evt, id) => {
    evt.stopPropagation();
};

export default function CustomEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
}: EdgeProps) {
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    return (
        <>
        <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
        <EdgeLabelRenderer>
            <div
            style={{
                position: 'absolute',
                transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                fontSize: 12,
                // everything inside EdgeLabelRenderer has no pointer events by default
                // if you have an interactive element, set pointer-events: all
                pointerEvents: 'all',
            }}
            className="nodrag nopan"
            >
            <Dialog>
                <DialogTrigger asChild> 
                    <Button className="edgebutton" onClick={(event) => onEdgeClick(event, id)}>
                        Tramite
                    </Button >
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Formulario</DialogTitle>
                        <DialogDescription>
                            Rellena los siguientes campos.
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <form className='flex flex-col justify-center items-center text-black'>
                            <input className='shadow w-full py-2 px-3 mb-4' type="text" placeholder="Nombre"/>
                            <input className='shadow w-full py-2 px-3 mb-4' type="text" placeholder="Apellido" />
                        </form>
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Enviar
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            </div>
        </EdgeLabelRenderer>
        </>
    );
}
