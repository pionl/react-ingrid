# React Infinite Grid [![Build Status](https://travis-ci.org/babotech/react-ingrid.svg?branch=master)](https://travis-ci.org/babotech/react-ingrid)

![Demo](https://raw.githubusercontent.com/babotech/react-ingrid/master/examples/ingrid_demo.gif)

_Hint: Pay attention to the DOM._

## Installation

```
npm install --save react-ingrid
```

## Features

*  *windowing* - render only visible items
*  relative positioning - all items position relative each other
*  supports Immutable.js

## Usage
```javascript
import Ingrid from 'react-ingrid'

// Regular array or Immutable.js List
const items = [
    { id:1, foo: 'bar' },
    ...
]

// Your component must accept 'data' prop.
const ItemComponent = ({ data }) => (
    ...
)

const props = {
    ItemComponent,
    items,
    itemWidth: 100,
    itemHeight: 100,
    load: () => ( /* load more items */ ),
    more: Boolean, // has more
    loading: Boolean
}

...
<Ingrid {...props}/>

// or with decorator
import { ingrid } from 'react-ingrid'
const Grid = ingrid(props => props)(ItemComponent)
```

## Props

* [`ItemComponent`](#ItemComponentProp)
* [`items`](#itemsProp)
* [`itemWidth`](#itemDimensionsProp)
* [`itemHeight`](#itemDimensionsProp)
* [`load`](#loadProp)
* [`more`](#moreProp)
* [`loading`](#loadingProp)
* [`paddingTop`](#paddingTopProp)
* [`paddingLeft`](#paddingLeftProp)
* [`onScrollChange`](#onScrollChangeProp)
* [`PreloaderComponent`](#PreloaderComponentProp)
* [`preloaderHeight`](#preloaderHeightProp)
* [`isShowingPreloader`](#isShowingPreloaderProp)
* [`shouldPrerenderAll`](#shouldPrerenderAll)
* [`itemProps`](#itemProps)


<a name="ItemComponentProp"></a>
#### ItemComponent (required)

Use your :sparkles:imagination:sparkles: to define how your grid items should look.

This component gets:

* `data` - The data to render (plain object or Immutable.js)
* `index` - The item index
* spreaded [`itemProps`](#itemProps)

It should return a react component. For example:

```js
const ItemComponent = ({data}) => (
    <div>
        <h1>{data.title}</h1>
    </div>
)
```


<a name="itemsProp"></a>
#### items (required)

An array (or Immutable.js List) of items to display. For example:

```js
const items = [
    {id:1, foo: 'bar'},
    ...
]
```


<a name="itemDimensionsProp"></a>
#### itemWidth & itemHeight (required)

ItemComponent's width and height.

For example, to render adaptive Ingrid (like with CSS media queries) you can do:

```js
...

const [ itemWidth, itemHeight ] =
    windowWidth >= 320 && windowWidth < 376 ? [ 200, 200 ] :
    windowWidth >= 568 && windowWidth < 667 ? [ 300, 300 ] :
    windowWidth >= 1435 && windowWidth < 1445 ? [ 400, 400 ] :
    [ 500, 500 ]

const props = {
    ...
    ItemComponent: UserPhoto,
    itemWidth,
    itemHeight,
    ...
}

return (
    <Ingrid {...props} />
)

...
```


<a name="loadProp"></a>
#### load (required)

Function that loads more items when user scrolls. Ingrid will call "load" every time user scrolls a page (unless you provide the [more](#moreProp) prop).
You design how items are modelled. Therefore, it's your responsibility to load <b>and sort</b> [items](#itemsProp) in your store.


<a name="moreProp"></a>
#### more (optional, boolean)

Ingrid loads [items](#itemsProp) when user scrolls. You must provide a boolean to tell whether you have more items to load.

By default, it is always true.


<a name="loadingProp"></a>
#### loading (required, boolean)

Normally you don't want to send multiple load requests at the same time. To tell Ingrid not to do it provide a boolean.

Also, you might want to show a preloader while loading new items. For example:

```js
const ImagesGrid = ({ onLoadmore, loading }) => {
    const props = {
        ...
        load: () => onLoadmore(),
        loading,
        ...
    }

    return (
        <Ingrid {...props} />
    )
}

class App extends React.Component {
    ...
    render() {
        const { loading } = this.props
        return (
            {loading ?
                <ImagesGrid /> :
                this.renderLoadmoreSpinner()
            }
        )
    }
}
```


<a name="paddingTopProp"></a>
#### paddingTop (optional)

You might want to add extra padding on top. This is the best place to do it :wink:

<b>Note:</b> Do not do it via CSS — Ingrid will not be able to calculate the top of the container, and everything will shake.


<a name="paddingLeftProp"></a>
#### paddingLeft (optional)

The same is as the [`paddingTop`](#paddingTopProp) but for the left side


<a name="onScrollChangeProp"></a>
#### getPaddingTop (optional)

This function is called when Ingrid is scrolled. It has the following signature:

```js
function getPaddingTop(value)
```

where:

* `value` - current paddingTop, if it > 0 or paddingTop prop then content was scrolled

You might want to use it to hide/show some element (hide a menu). For example:

```js
const ImagesGrid = ({ handleGridScroll }) => {
    const props = {
        ...
        getPaddingTop: (value) => handleGridScroll(value),
        ...
    }

    return (
        <Ingrid {...props} />
    )
}

// ImagesActions.js
export const handleGridScroll = value => (dispatch, getState) => {
    const menuHeight = 300
    const { isMobile } = getState()

    if (isMobile && (value > menuHeight)) {
        dispatch({
            action: 'HIDE_MENU'
        })
    }
    if (isMobile && (value < menuHeight)) {
        dispatch({
            action: 'SHOW_MENU'
        })
    }
}

class App extends React.Component {
    ...
    render() {
        const { isShowingMenu } = this.props
        return (
            ...
            {isShowingMenu ?
                <Menu /> : ''
            }
            ...
        )
    }
}
```

<a name="isShowingPreloaderProp"></a>
#### isShowingPreloader (optional, boolean)

Ingrid shows a preloader while loading new items. We don't recommend to disable this behaviour. The better way is to create your own preloader and pass it through [`PreloaderComponent`](#PreloaderComponentProp) prop.

By default, it is true.


<a name="PreloaderComponentProp"></a>
#### PreloaderComponent (optional)

If you don't happy with our default preloader use your :sparkles:imagination:sparkles: to implement your own.

```js
const PreloaderComponent = () => (
    <div>
        <h1>Much loading. So wait.</h1>
    </div>
)
```


<a name="preloaderHeightProp"></a>
#### preloaderHeight (optional)

You can add more space for your preloader here.

<a name="itemProps"></a>
#### itemProps (optional)

You can pass additional props to your `ItemComponent`.

```javascrupt
const ItemComponent = (props) => (
    const data = props.data
    const custom = props.custom
    <div>
        <h1>Much loading. So wait.</h1>
    </div>
)
const itemProps = {
    custom: true
}
return <Ingrid itemProps={itemProps} ... />
```

<a name="shouldPrerenderAll"></a>
#### shouldPrerenderAll (optional)

If you want to render your grid on the server side you should set this propery true. In this case all items will be rendered on the initial render call.


## Examples

* [Babex.com](http://babex.com/)
* [Demo](http://babotech.github.io/react-ingrid/)

## License

**MIT**
