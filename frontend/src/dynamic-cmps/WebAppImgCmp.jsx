import React from 'react'
import { ElementToolBar } from '../components/editor/ElementToolBar'

export const WebAppImgCmp = ({ cmp, currCmp, onSetCurrCmp, onDeleteCmp, onDuplicateCmp, onUpdateCmp }) => {

    if (currCmp && currCmp.id === cmp.id) {
        return (
            <div className="nuetral-div" style={{ ...cmp.attributes.style, position: 'relative' }}>
                <ElementToolBar cmp={cmp} onDeleteCmp={onDeleteCmp} onDuplicateCmp={onDuplicateCmp} onUpdateCmp={onUpdateCmp} />
                <img id={cmp.id} style={{ width: '100%', height: '100%', outline: '2px dashed #c6c6c6', outlineOffset: '-2px', objectFit: 'cover' }} className={cmp.attributes.className + ' editable-image'} src={cmp.attributes.src} alt="sorry no img" onClick={(ev) => onSetCurrCmp(ev, cmp)} />
            </div>
        )
    }

    return (
        <div className="nuetral-div" style={cmp.attributes.style}>
            <img id={cmp.id} style={{ width: '100%', height: '100%', objectFit: 'cover' }} className={cmp.attributes.className} src={cmp.attributes.src} alt="sorry no img" onClick={(ev) => onSetCurrCmp(ev, cmp)} />
        </div>
    )
}