import React from 'react';
import { useIntl } from 'react-intl';
import { SidebarPortal, BlockDataForm } from '@plone/volto/components';

import { ILeafletMapSchema } from './schema';

import loadable from '@loadable/component';
const Map = loadable(() => import('./Map'), {
  ssr: false,
});

const LeafletBlockEdit = (props) => {
  const { block, data, selected, onChangeBlock } = props;

  const intl = useIntl();
  const schema = ILeafletMapSchema(intl);

  React.useEffect(() => {
    const schema = ILeafletMapSchema(intl);
    const initialValues = {};
    Object.keys(schema.properties).forEach((key) => {
      if (schema.properties[key].hasOwnProperty('initialValue')) {
        initialValues[key] = schema.properties[key].initialValue;
      }
    });
    onChangeBlock(block, {
      ...initialValues,
      ...data,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (id, value) => {
    props.onChangeBlock(block, {
      ...data,
      [id]: value,
    });
  };

  return (
    <>
      <SidebarPortal selected={selected}>
        <BlockDataForm
          schema={schema}
          title={schema.title}
          formData={data}
          onChangeField={handleChange}
        />
      </SidebarPortal>
      <Map data={data} />
    </>
  );
};
export default LeafletBlockEdit;
