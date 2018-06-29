/* eslint max-len: "off" */
/* eslint no-param-reassign: "off" */
import CircularJSON from 'circular-json';

const ShallowEquals = {
    /**
     * [Compare objects]
     * @param  {[Object]} objectA [Source to compare]
     * @param  {[Object]} objectB [Source to be compared]
     * @return {[Boolean]}        [equals or not]
     */
    equals: (objectA, objectB) => ShallowEquals.stringifyCircular(objectA) === ShallowEquals.stringifyCircular(objectB),

    /**
     * [Compare objects]
     * @param  {[Object]} objectA [Source to compare]
     * @param  {[Object]} objectB [Source to be compared]
     * @return {[Boolean]}        [equals or not]
     */
    diff: (objectA, objectB) => ShallowEquals.stringifyCircular(objectA) !== ShallowEquals.stringifyCircular(objectB),

    /**
     * [Transform an object in a string]
     *
     * @param  {[Object]} obj [object to convert in a string]
     * @return {[String]}     [object converted to string]
     */
    stringifyCircular: object => CircularJSON.stringify(object),

    /**
     * [remove childrens from props (also removing circular ref)]
     * @param  {[Object]} initialProps [initial values]
     * @return {[Object]}              [returned value without childs]
     */
    removeChildsFromProps: initialProps => {
        const props = {...initialProps};

        if (props.childrens)
            delete props.childrens;
        return props;
    },

    /**
     * [compare current props/state and compare them to next props/state]
     * @param  {[Object]} that      [Copy of this(class context)]
     * @param  {[Object]} nextProps [Props that will be applied]
     * @param  {[Object]} nextState [State that will be applied]
     * @param  {[Array]} only       [Only compare those elements if specified]
     * @return {[Boolean]}          [true if a change have occured]
     */
    shouldComponentUpdate: (that, nextProps, nextState, only = []) => {
        let nextPropsCopy = {};
        let thatPropsCopy = {};

        if (only.length > 0) {
            only.forEach(val => {
                nextPropsCopy[val] = nextProps[val];
                thatPropsCopy[val] = that.props[val];
            });
        } else {
            nextPropsCopy = {...nextProps};
            thatPropsCopy = {...that.props};
        }

        return !ShallowEquals.equals(thatPropsCopy, nextPropsCopy) || !ShallowEquals.equals(that.state, nextState);
    }
};

export default ShallowEquals;
