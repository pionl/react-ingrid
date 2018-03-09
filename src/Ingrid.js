import React, {Component, PropTypes} from 'react'
import Display from './Display'

class Ingrid extends Component {

    getChildContext() {
        const {
            ItemComponent,
            itemHeight,
            items,
            itemWidth,
            loading,
            PreloaderComponent,
            preloaderHeight,
            isShowingPreloader,
            itemProps,
            getItemKey
        } = this.props

        return {
            ItemComponent,
            itemHeight,
            items,
            itemWidth,
            loading,
            PreloaderComponent,
            preloaderHeight,
            isShowingPreloader,
            itemProps,
            getItemKey
        }
    }

    render() {
        const {
            buffer,
            getPaddingTop,
            itemHeight,
            items,
            itemWidth,
            load = () => null,
            loading,
            more,
            paddingLeft,
            paddingTop,
            shouldPrerenderAll = false
        } = this.props

        let total

        if (typeof items.count === `function`) {
            total = items.count()
        } else {
            total = items.length
        }

        return (
            <Display
                buffer={buffer}
                getPaddingTop={getPaddingTop}
                itemHeight={itemHeight}
                items={items}
                itemWidth={itemWidth}
                load={load}
                loading={loading}
                more={more}
                shouldPrerenderAll={shouldPrerenderAll}
                paddingLeft={paddingLeft}
                paddingTop={paddingTop}
                total={total}
            />
        )
    }
}

Ingrid.childContextTypes = {
    ItemComponent: PropTypes.func,
    itemHeight: PropTypes.number,
    items: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    itemWidth: PropTypes.number,
    loading: PropTypes.bool,
    PreloaderComponent: PropTypes.func,
    preloaderHeight: PropTypes.number,
    isShowingPreloader: PropTypes.bool,
    itemProps: PropTypes.any,
    getItemKey: PropTypes.func.isRequired
}

Ingrid.propTypes = {
    buffer: PropTypes.number,
    getPaddingTop: PropTypes.func,
    ItemComponent: PropTypes.func.isRequired,
    itemHeight: PropTypes.number.isRequired,
    items: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    itemWidth: PropTypes.number.isRequired,
    paddingTop: PropTypes.number,
    preloaderHeight: PropTypes.number,
    prerenderAll: PropTypes.bool,
    itemProps: PropTypes.any,
    getItemKey: PropTypes.func
}

Ingrid.defaultProps = {
    getItemKey: (item) => typeof item.get === `function` ? item.get(`id`) : item.id
}

export default Ingrid
