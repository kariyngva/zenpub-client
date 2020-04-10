import { useEditCommunity } from 'fe/community/edit/useEditCommunity';
import { useFormik } from 'formik';
import { Community } from 'graphql/types.generated';
import React, { FC, useMemo } from 'react';
import {
  EditCommunityFormValues,
  EditCommunityPanel
} from 'ui/modules/EditCommunityPanel';
import * as Yup from 'yup';

export const validationSchema: Yup.ObjectSchema<EditCommunityFormValues> = Yup.object<
  EditCommunityFormValues
>({
  name: Yup.string()
    .min(2)
    .max(60)
    .required(),
  summary: Yup.string().max(500),
  icon: Yup.mixed<File | string>() //.url(),
});

export interface Props {
  communityId: Community['id'];
  done(): any;
}
export const EditCommunityPanelHOC: FC<Props> = ({
  done,
  communityId
}: Props) => {
  const { community, edit } = useEditCommunity(communityId);
  const initialValues = useMemo<EditCommunityFormValues>(
    () => ({
      icon: community?.icon?.url || '',
      name: community?.name || '',
      summary: community?.summary || ''
    }),
    [community]
  );

  const formik = useFormik<EditCommunityFormValues>({
    enableReinitialize: true,
    onSubmit: vals => {
      return edit(
        {
          name: vals.name,
          summary: vals.summary || undefined
        },
        vals.icon
      );
    },
    validationSchema,
    initialValues
  });
  return <EditCommunityPanel cancel={done} formik={formik} />;
};
