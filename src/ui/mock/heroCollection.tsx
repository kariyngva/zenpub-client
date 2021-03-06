import { action } from '@storybook/addon-actions';
import {
  Props as HeroCollectionProps,
  Status as HeroCollectionStatus
} from 'ui/modules/HeroCollection';
import { useToggleFormik } from './formik';

export const useGetHeroCollectionProps = (
  isAdmin = false,
  following = true,
  icon = 'https://i0.wp.com/japanese-journey.com/wp-content/uploads/2016/03/spaced-repetition.png',
  name = 'Spaced repetition',
  fullName = 'spaced_repetition@home.moodle.net',
  communityIcon = 'https://i0.wp.com/japanese-journey.com/wp-content/uploads/2016/03/spaced-repetition.png',
  communityName = 'Super community',
  summary = 'Technology such as games and mobile apps can help manage your learning and your forgetting.'
): HeroCollectionProps => {
  return {
    collection: {
      status: HeroCollectionStatus.Loaded,
      isAdmin,
      canModify: true,
      following,
      basePath: '/',
      isFlagged: false,
      icon,
      name,
      fullName,
      communityIcon,
      communityId: '2',
      isOpenDropdown: false,
      toggleDropdown: action('toggleDropdown'),
      communityName,
      summary,
      followerCount: 10,
      toggleJoinFormik: useToggleFormik(),
      edit: action('editCollection'),
      addToFeatured: action('showAddToFeatured'),
      flag: action('showFlag')
    }
  };
};
