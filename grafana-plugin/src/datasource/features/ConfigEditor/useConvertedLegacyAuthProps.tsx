import { AuthMethod, convertLegacyAuthProps } from '@grafana/plugin-ui';

import { FalconDataSourceOptionsProps } from './FalconDataSourceOptionsProps';

type ConvertedLegacyProps = ReturnType<typeof convertLegacyAuthProps>;

export function useConvertedLegacyAuthProps({
  options,
  onOptionsChange,
}: FalconDataSourceOptionsProps): ConvertedLegacyProps {
  const baseConvertedProps = convertLegacyAuthProps({
    config: options,
    onChange: onOptionsChange,
  });
  return {
    ...baseConvertedProps,
    customHeaders: undefined,
    visibleMethods: [AuthMethod.NoAuth, AuthMethod.OAuthForward],
  };
}
