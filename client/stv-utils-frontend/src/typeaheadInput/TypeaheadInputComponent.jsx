import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import Highlight from 'react-highlighter';

class TypeaheadInput extends React.Component {

    static get propTypes() {
        return {
            // Input field name
            name: React.PropTypes.string.isRequired,
            // Select option change callback
            onChange: React.PropTypes.func.isRequired,
            // Text to display when there ar no options in list
            emptyLabel: React.PropTypes.string.isRequired,
            // Disable input
            disabled: React.PropTypes.bool,
            // Select options array[{id: 1, label: 'demo label', 'email' => 'demo@email.lt'}]
            options: React.PropTypes.array,
            // Selected option
            selected: React.PropTypes.array,
            // Multiple selections
            multiple: React.PropTypes.bool,
            // Placeholder
            placeholder: React.PropTypes.string,
            // Max results to display
            maxResults: React.PropTypes.number,
            // Custom user class
            className: React.PropTypes.string,
        };
    }

    static get getDefaultProps() {
        return {
            disabled: false,
            multiple: false,
            options: [],
            selected: [],
            placeholder: '',
            maxResults: 1000,
            className: '',
        };
    }

    clear() {
        this.typeaheadInput.getInstance().clear();
    }

    render() {
        let className = 'stv-typeahead';

        if (this.props.className && this.props.className.length) {
            className += ' ' + this.props.className;
        }

        return (
            <div id={this.props.name} className={className}>
                <Typeahead
                    multiple={this.props.multiple}
                    ref={(typeaheadInput) => {this.typeaheadInput = typeaheadInput;}}
                    name={this.props.name}
                    disabled={this.props.disabled}
                    onChange={this.props.onChange}
                    options={this.props.options}
                    selected={this.props.selected}
                    emptyLabel={this.props.emptyLabel}
                    maxResults={this.props.maxResults}
                    placeholder={this.props.placeholder}
                    filterBy={['email']}
                    renderMenuItemChildren={(props, option) => (
                        <div id={`stv-typeahead-option-${option.id}`} className={option.email ? 'contains-email':null}>
                            {option.preElement}
                            <Highlight search={props.text}>{option.label}</Highlight>
                            {option.email
                                ?<span>(<Highlight search={props.text}>{option.email}</Highlight>)</span>
                                : null
                            }
                            {option.postElement}
                        </div>
                    )}
                />
                <button id={`${this.props.name}-close`} className="clear-stv-typeahead" onClick={() => {this.clear();}}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </button>
            </div>
        );
    }
}

export default TypeaheadInput;