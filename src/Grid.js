import React, {Component, PropTypes} from 'react'

const defaultScrollHelperStyle = {
    display: `block`,
    position: `relative`,
    width: `100%`,
    height: 0
}

const defaultItemStyle = {
    display: `inline-block`,
    position: `relative`,
    verticalAlign: `bottom`,
    width: 0,
    height: 0
}


function createItemStyle (context) {
    const {itemWidth, itemHeight} = this.context

    return {
        ...defaultItemStyle,
        width: itemWidth,
        height: itemHeight
    }
}

export class DefaultPreloader extends Component {
    render() {
        const style = {
            color: `#000`,
            fontSize: `20px`,
            fontFamily: `sans-serif`,
            marginLeft: `-70px`,
            marginBottom: `35px`,
            letterSpacing: `1.5px`
        }
        return (
            <div style={style}>
                Loading...
            </div>
        )
    }
}

class Grid extends Component {

    render() {
        const {
            offsetTop = 0,
            minVisibleIndex = 0,
            maxVisibleIndex = 0,
            height = 0
        } = this.props

        const defaultpreloaderHeight = 200

        const {
            items = [],
            loading,
            paddingTop = 0,
            PreloaderComponent = DefaultPreloader,
            preloaderHeight = defaultpreloaderHeight,
            isShowingPreloader = true,
            itemProps,
            renderItem
        } = this.context

        const contentStyle = {
            position: `relative`,
            height: isShowingPreloader && loading ? preloaderHeight + height : height
        }

        const scrollHelperStyle = {
            ...defaultScrollHelperStyle,
            height: offsetTop + paddingTop
        }

        const preloaderStyle = {
            bottom: 0,
            left: `50%`,
            position: `absolute`
        }

        const hasCustomRenderItem = typoef renderItem === 'function'

        return (
            <div style={contentStyle}>
                <div style={scrollHelperStyle}/>
                {items
                    .slice(minVisibleIndex, maxVisibleIndex + 1)
                    .map(item => (
                        const key = typeof item.get === `function` ? item.get(`id`) : item.id
                        const style = createItemStyle(this.context)
                        return <ItemComponent style={style} data={item} key={key} {...itemProps}>
                    ))}

                {isShowingPreloader && loading ?
                    <div style={preloaderStyle}>
                        <PreloaderComponent />
                    </div> :
                    ``
                }
            </div>
        )
    }
}

Grid.contextTypes = {
    items: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    loading: PropTypes.bool,
    PreloaderComponent: PropTypes.func,
    preloaderHeight: PropTypes.number,
    isShowingPreloader: PropTypes.bool
}

export default Grid
