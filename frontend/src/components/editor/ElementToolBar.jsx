import React, { useEffect, useRef, useState } from 'react'
import { FaTrashAlt, FaCopy } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import { BsFonts, BsBoundingBoxCircles, BsImage } from "react-icons/bs";
import { IoMdColorPalette } from "react-icons/io";
import Tooltip from '@mui/material/Tooltip';
import { EditorModal } from './EditorModal';





export const ElementToolBar = ({ cmp, onDeleteCmp, onDuplicateCmp, onUpdateCmp, editorWidth }) => {

    const [isEditing, setIsEditing] = useState(false)
    const [event, setEvent] = useState(null)
    const [choosenTool, setChoosenTool] = useState(null)
    const [toolBarPosition, setToolBarPosition] = useState()

    const ref = useRef(null)

    useEffect(() => {
        setToolBarPosition(ref.current?.getBoundingClientRect())
    }, [])

    const onToggleEditing = (ev, tool) => {
        ev.stopPropagation()
        setEvent(ev)
        setIsEditing(!isEditing)
        setChoosenTool(tool)
    }

    // Setting the position of the toolbar (Bottom / Top - depends on the available space)
    const elCmp = document.getElementById(cmp.id);

    if(!elCmp) {
        return null;
    }

    const elCmpPos = elCmp.getBoundingClientRect();
    // const isLeftSpace = elCmpPos.left < 440
    
    let style = {};
    if (window.innerWidth > 850) {
        if (elCmpPos.top < 230) {
            style = {
                bottom: `-30px`,
                top: 'unset',
                transform: `${toolBarPosition?.left <= 420 ? 'translate(50%, 0)' : 'translate(0, 0)'}`
            }
        } else {
            style =
            {
                top: '-2rem',
                transform: `${toolBarPosition?.left <= 420 ? 'translate(50%, 0)' : 'translate(0, 0)'}`
            }
        }
    }



    return (
        <>
            {isEditing && <EditorModal setIsEditing={setIsEditing} event={event} cmp={cmp} elCmpPos={elCmpPos} onUpdateCmp={onUpdateCmp} choosenTool={choosenTool} editorWidth={editorWidth} />}
            <div ref={ref} className="element-tool-bar" style={style}>
                {cmp.type === 'btn' &&
                    <>
                        <Tooltip type="button" title="Text" arrow placement="top"><div className="element-tool" onClick={(ev) => { onToggleEditing(ev, 'txt') }}><BsFonts className="text-tool tool" /></div></Tooltip>
                        <Tooltip title="Link" arrow placement="top"><div className="element-tool" onClick={(ev) => { onToggleEditing(ev, 'link') }}><FiLink className="link-tool tool" /></div></Tooltip>
                        <Tooltip title="Color" arrow placement="top"><div className="element-tool" onClick={(ev) => { onToggleEditing(ev, 'color') }}><IoMdColorPalette className="color-tool tool" /></div></Tooltip>
                    </>
                }
                {cmp.type === 'img' &&
                    <Tooltip title="Image" arrow placement="top"><div className="element-tool" onClick={(ev) => { onToggleEditing(ev, 'img') }}><BsImage className="image-tool tool" /></div></Tooltip>
                }
                {cmp.type === 'txt' &&
                    <>
                        <Tooltip title="Text" arrow placement="top"><div className="element-tool" onClick={(ev) => { onToggleEditing(ev, 'txt') }}><BsFonts className="text-tool tool" /></div></Tooltip>
                        <Tooltip title="Color" arrow placement="top"><div className="element-tool" onClick={(ev) => { onToggleEditing(ev, 'color') }}><IoMdColorPalette className="color-tool tool" /></div></Tooltip>
                    </>
                }
                {cmp.type === 'section' &&
                    <>
                        <Tooltip title="Background image" arrow placement="top"><div className="element-tool" onClick={(ev) => { onToggleEditing(ev, 'backgroundImg') }}><BsImage className="image-tool tool" /></div></Tooltip>
                        <Tooltip title="Color" arrow placement="top"><div className="element-tool" onClick={(ev) => { onToggleEditing(ev, 'color') }}><IoMdColorPalette className="color-tool tool" /></div></Tooltip>
                    </>
                }
                <Tooltip title="Size" arrow placement="top"><div className="element-tool" onClick={(ev) => { onToggleEditing(ev, 'size') }}><BsBoundingBoxCircles className="size-tool tool" /></div></Tooltip>
                <Tooltip title="Copy" arrow placement="top"><div className="element-tool" onClick={() => { onDuplicateCmp(cmp) }}><FaCopy className="copy-tool tool" /></div></Tooltip>
                <Tooltip title="Delete" arrow placement="top"><div className="element-tool" onClick={() => { onDeleteCmp(cmp.id) }}><FaTrashAlt className="delete-tool tool" /></div></Tooltip>
            </div>
        </>
    )
}
