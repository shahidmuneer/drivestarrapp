import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import DriverScreen from './DriverView';
import { loadImages, refreshImages } from './DriverState';

export default compose(
  connect(
    state => ({
      isLoading: state.gallery.isLoading,
      images: state.gallery.images,
    }),
    dispatch => ({
      loadImages: () => dispatch(loadImages()),
      refreshImages: () => dispatch(refreshImages()),
    }),
  ),
  lifecycle({
    componentDidMount() {
      this.props.loadImages();
    },
  }),
)(DriverScreen);
