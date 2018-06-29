/* eslint-disable */
{getFieldDecorator('geo', {})(
    <Geosuggest
      ref={el=>this._geoSuggest=el}
      placeholder="Start typing!"
      onSuggestSelect={value => this.props.form.setFieldsValue({geo: value})}
      location={new google.maps.LatLng(53.558572, 9.9278215)}
      radius="20"
    />
)}

/*
 * Fonction pour render les resultats d'un autocomplete par groupe
 */
const Option = AutoComplete.Option
const OptGroup = AutoComplete.OptGroup;

constructor(props) {
    super(props)

    const autocompleted = Api.init({
        url: '/admin/contracts/autocomplete',
        data: this.default._recruiter ? [{ _id: this.default._recruiter, name: '' }] : []
    })


    this.state = {
        autocompleted
    }
}

componentDidMount() {
    if (this.default._recruiter) {
        Api.autocomplete(this, "autocompleted", { key: this.default._recruiter, 'v2': true })
    }
}

{getFieldDecorator('_recruiter', {
    initialValue: this.default._recruiter
})(
    <AutoComplete
      dataSource={this.state.autocompleted.data.map(this.renderOption)}
      style={{ width: 200 }}
      dropdownMatchSelectWidth={false}
      onSearch={val => Api.autocomplete(this, "autocompleted", { 'v2': true, filter: {keyword: val}} )}
      onSelect={val => Api.autocomplete(this, "autocompleted", { 'v2': true, filter: {key: val}} )}
      placeholder="input here"
      optionLabelProp="label"
    />
)}

renderTitle(title, length) {
    return (
        <span>
            {title}
            <a
              style={{ float: 'right' }}
              // href="https://www.google.com/search?q=antd"
              target="_blank"
              rel="noopener noreferrer"
            >
                {length}
            </a>
        </span>
    );
}

renderOption = (item) => {
    console.log(item)
    return (
        <OptGroup
          key={item.name}
          label={this.renderTitle(item.name, item.values.length)}
        >
            {item.values.map(opt => (
                <Option key={opt.title} value={opt.title}>
                    {opt.title}
                    <span>{opt._createdAt}</span>
                </Option>
            ))}
        </OptGroup>
    )
}