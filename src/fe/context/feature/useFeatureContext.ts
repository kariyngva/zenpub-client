import { FeaturedCollectionsDocument } from 'fe/collection/featured/featuredCollections.generated';
import { FeaturedCommunitiesDocument } from 'fe/community/featured/featuredCommunities.generated';
import {
  useAddFeaturedMutation,
  useRemoveFeaturedMutation
} from 'fe/mutation/feature/useMutateFeature.generated';
import { Collection, Community, Feature } from 'graphql/types.generated';
import { useCallback, useMemo } from 'react';

export type Actor = Collection | Community;

export type UseFeaturedContext =
  | {
      isFeatured: false;
      actor: /* Maybe< */ Pick<Actor, 'id' | '__typename'> /* > */;
    }
  | {
      isFeatured: true;
      featureId: Feature['id'];
      __typename: Actor['__typename'];
    };

export const useFeaturedContext = (ctx: UseFeaturedContext) => {
  const [addFeaturedMut, addFeaturedMutStatus] = useAddFeaturedMutation();
  const [rmFeaturedMut, rmFeaturedMutStatus] = useRemoveFeaturedMutation();
  const mutating = addFeaturedMutStatus.loading || rmFeaturedMutStatus.loading;
  // const featuredCollectionsQ = useFeaturedCollectionsQuery();
  // const featuredCommunitiesQ = useFeaturedCommunitiesQuery();

  // const featuredCommunities = useMemo(
  //   () => manageEdges(featuredCommunitiesQ.data?.instance?.featuredCommunities),
  //   [featuredCommunitiesQ]
  // );

  // const featuredCollections = useMemo(
  //   () => manageEdges(featuredCollectionsQ.data?.instance?.featuredCollections),
  //   [featuredCollectionsQ]
  // );

  // const isFeatured = useMemo(
  //   () =>
  //     !ctx || !ctx.__typename
  //       ? null
  //       : ctx.__typename === 'Collection'
  //       ? !!featuredCollections.find(
  //           featCollection => featCollection.id === ctx.id
  //         )
  //       : ctx.__typename === 'Community'
  //       ? !!featuredCommunities.find(
  //           featCommunity => featCommunity.id === ctx.id
  //         )
  //       : null,
  //   [featuredCollections, featuredCommunities, ctx]
  // );

  const toggleFeatured = useCallback(async () => {
    if (!ctx.isFeatured) {
      const { id, __typename } = ctx.actor;
      if (!id || !__typename || mutating) {
        return;
      }

      return addFeaturedMut({
        variables: {
          contextId: id
        },
        refetchQueries: [
          {
            query:
              __typename === 'Community'
                ? FeaturedCommunitiesDocument
                : FeaturedCollectionsDocument
          }
        ]
      });
    } else {
      return rmFeaturedMut({
        variables: {
          contextId: ctx.featureId // need it
        },
        refetchQueries: [
          {
            query:
              ctx.__typename === 'Community'
                ? FeaturedCommunitiesDocument
                : FeaturedCollectionsDocument
          }
        ]
      });
    }
  }, [ctx]);

  return useMemo(
    () => ({
      // isFeatured,
      toggleFeatured
    }),
    [toggleFeatured /* , isFeatured */]
  );
};
