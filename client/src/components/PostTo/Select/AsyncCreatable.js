/* eslint react/prefer-es6-class: 0 */
/* eslint react/sort-prop-types: 0 */
/* eslint react/jsx-handler-names: 0 */
/* eslint react/jsx-indent: 0 */
/* eslint react/no-multi-comp: 0 */
/* eslint no-use-before-define: 0 */
/* eslint no-shadow: 0 */
/* eslint no-undefined: 0 */
import React from 'react';
import Select from './Select';

function reduce(obj, props = {}){
  return Object.keys(obj)
  .reduce((props, key) => {
    const value = obj[key];
    if (value !== undefined) props[key] = value;
    return props;
  }, props);
}

const AsyncCreatable = React.createClass({
	displayName: 'AsyncCreatableSelect',

	render () {
		return (
            <Select.Async {...this.props}>
                {(asyncProps) => (
                    <Select.Creatable {...this.props}>
                        {(creatableProps) => (
                            <Select
                                {...reduce(asyncProps, reduce(creatableProps, {}))}
                                onInputChange={(input) => {
                                    creatableProps.onInputChange(input);
                                    return asyncProps.onInputChange(input);
                                }}
                                ref={(ref) => {
                                    creatableProps.ref(ref);
                                    asyncProps.ref(ref);
                                }}
                            />
                        )}
                    </Select.Creatable>
                )}
            </Select.Async>
		);
	}
});

module.exports = AsyncCreatable;
