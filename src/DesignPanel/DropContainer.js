import React from 'react';
import {
    DragSource,
    DropTarget,
} from 'react-dnd';
import cx from 'classnames';
import Types from '../common/WidgetTypes';
// import { uuid } from '../utils';
import {
    WidgetPreviewItem,
    WidgetPlaceholderItem
} from '../widgets';
import LayoutContext from '../LayoutContext';

const spec = {
    canDrop(props, monitor) {
        //  console.log(props)
        //console.log('canDrop')
        return true;
    },
    hover() {
        console.log('hoverDrop')
    },
    drop(props, monitor, component) {
        console.log('drop')
        if (monitor.didDrop()) {
            console.log('has did drop')
            return;
        }
        console.log(111)
        // const cid = props.data.id;
        const designer = component.context;
        //console.log(monitor.getItem())
        designer.addItem({

        })
    }
};

const collect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
    }
}

class DropContainer extends React.Component {

    static contextType = LayoutContext;

    rendrePlaceholder() {
        return (
            <WidgetPlaceholderItem />
        );
    }

    render() {
        const { connectDropTarget, isOver, canDrop } = this.props;
        const designer = this.context;
        const items = designer.getItems();
        console.log('dp c')
        return connectDropTarget(
            <div className={cx({
                "design-layout-container": true,
                "drag-over": isOver,
                "dropable": canDrop,
            })}>
                {
                    items.map((item, i) => {
                        return <WidgetPreviewItem key={i} />
                    })
                }
                {
                    isOver ? this.rendrePlaceholder() : null
                }
            </div>
        );
    }
}

export default DropTarget(Types.WidgetComponent, spec, collect)(DropContainer);