import Select from 'react-select/async';

export default class AsyncSelect extends Select {
  /**
   * reload()
   * Called when optional load arguments change, to reload the
   * data from remote source with new options
   * loadOptions={
   *  (inputValue) => this.props.loadOptions(
   *      inputValue,
   *      this.props.loadArguments
   *    )
   *  }
   */
  reload() {
    this.loadOptions('', options => {
      const isLoading = !!this.lastRequest;
      this.setState({ defaultOptions: options || [], isLoading });
    });
  }

  componentWillReceiveProps(nextProps) {
    // if the cacheOptions prop changes, clear the cache, force a reload
    if (nextProps.cacheOptions !== this.props.cacheOptions) {
      this.optionsCache = {};
    }
    /**
     * loadArguments
     * Optional property used in the remote request.
     * If these change externally, then the options should be reloaded.
     * This is handy for things like related selects.
     */
    if (nextProps.loadArguments !== this.props.loadArguments) {
      this.reload();
    }
    if (nextProps.customReload !== this.props.customReload) {
      this.reload();
    }
    if (nextProps.defaultOptions !== this.props.defaultOptions) {
      this.setState({
        defaultOptions: Array.isArray(nextProps.defaultOptions)
          ? nextProps.defaultOptions
          : undefined
      });
    }
  }
}
