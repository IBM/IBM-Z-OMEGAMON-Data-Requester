import { TransformerRegistryItem, DataFrame, DataTransformerInfo, DataLink, DataLinkClickEvent } from '@grafana/data';
import { mergeMap } from 'rxjs';

import { WebhookTransformerEditor } from './WebhookTransformerEditor';

export type WebhookTransformerOptions = {
  field?: string;
  url: string;
  title: string;
  message: string;
};

function transformFrame(frame: DataFrame, { field: fieldName, url, title, message }: WebhookTransformerOptions) {
  const field = frame.fields.find((field) => field.name === fieldName);

  if (!field) {
    return frame;
  }

  const webhookLink: DataLink = {
    title: title || 'No link name',
    url: '',
    onClick: (event: DataLinkClickEvent) => {
      const payload = {
        text: event.replaceVariables ? event.replaceVariables(message) : message,
      };
      fetch(url, {
        // 'no-cors' allows sending requests without expecting response data, it is temporary solution.
        mode: 'no-cors',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch((error) => {
        console.error('Error sending data to webhook:', error);
      });

      event.e.preventDefault();
    },
  };

  field.config.links = [...(field.config.links ?? []), webhookLink];
  return frame;
}

function getWebhookTransformation(): DataTransformerInfo<WebhookTransformerOptions> {
  return {
    id: `falcon-webhook-transformer`,
    name: `Falcon. Webhook`,
    description: 'Add Falcon Web Hook',
    defaultOptions: {},
    operator: (options) => (source) => {
      return source.pipe(
        mergeMap(async (frameArray: DataFrame[]) => {
          if (!frameArray.length) {
            return frameArray;
          }

          if (!options.field) {
            return frameArray;
          }

          if (frameArray.length > 1) {
            throw new Error('Found more than one frame. Webhook works with a single frame.');
          }

          return frameArray.map((frame) => transformFrame(frame, options));
        })
      );
    },
  };
}

export function getWebhookTransformer(): TransformerRegistryItem<WebhookTransformerOptions> {
  const transformer = getWebhookTransformation();

  return {
    id: transformer.id,
    editor: WebhookTransformerEditor,
    transformation: transformer,
    name: transformer.name,
    description: transformer.description,
  };
}
