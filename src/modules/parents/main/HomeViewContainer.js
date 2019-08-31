import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import HomeScreen from './HomeView';
import { loadImages, refreshImages } from './HomeState';

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
)(HomeScreen);
