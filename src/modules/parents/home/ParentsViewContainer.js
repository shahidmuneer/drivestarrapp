import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import ParentsScreen from './ParentsView';
import { loadImages, refreshImages } from './ParentsState';

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
)(ParentsScreen);
