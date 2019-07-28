import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import LoginScreen from './LoginView';
import { loadImages, refreshImages } from './LoginState';

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
)(LoginScreen);
