import { parseCmsSqlQuery } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery';
import { mockedMetadataLoader } from 'datasource/features/metadata/mocks';

import { inappropriateWritetimeColumnMessage } from './validatorCommon';

/**
 * During validation of query we check variables too.
 * Current tests are focused on validation check of different part of query but nor variables,
 * So add empty mock of getTemplateSrv to avoid failing tests on this.
 * Validation of variables is handled in separate file on same level: validateVariables.spec.ts
 */
jest.mock('@grafana/runtime', () => ({
  getTemplateSrv: () => ({
    getVariables: () => {
      return [];
    },
  }),
}));

test('Validate correct query', async () => {
  const result = await parseCmsSqlQuery(
    `
      SELECT
        TIMESTAMP, MVSID, SSID, ENCLCPUT, ENCLPER_P_, ENCLPIDX, WRITETIME
      FROM
        KDP.REALTHDA
      HISTORY()
      WHERE
        ((ORIGINNODE = 'DB2plex:DB2plex:Plexview' OR
        ORIGINNODE = 'ICB4:RSD2:DB2' OR
        ORIGINNODE = 'IDS4:DB2plex:DSGROUP' OR
        ORIGINNODE = 'XEDB2:RSD2') );
    `,
    mockedMetadataLoader
  );
  expect(result.queryObject).not.toBeNull();
  expect(result.problems).toHaveLength(4);
  expect(result).toMatchSnapshot();
});

test('Validate columns and filters', async () => {
  const result = await parseCmsSqlQuery(
    `
      SELECT
        TIMESTAMP, MVSID, SSID, ENCLCPUT, ENCLPER_P_, ENCLPIDX, WRITETIME, TESTABCD
      FROM
        KDP.REALTHDA
      WHERE
        ((ORIGINNODE = 'DB2plex:DB2plex:Plexview' OR
        ORIGINNODE = 'ICB4:RSD2:DB2' OR
        ORIGINNODE = 'IDS4:DB2plex:DSGROUP' OR
        ORIGINNODE = 'XEDB2:RSD2') );
    `,
    mockedMetadataLoader
  );
  expect(result.queryObject).not.toBeNull();
  expect(
    result.problems.filter(
      (problem) =>
        problem.stage === 'validator' &&
        problem.severity === 'error' &&
        problem.message === inappropriateWritetimeColumnMessage
    )
  ).toHaveLength(1);
  expect(
    result.problems.filter(
      (problem) =>
        problem.stage === 'validator' &&
        problem.severity === 'warning' &&
        problem.message === 'Column "TESTABCD" not found in table "KDP.REALTHDA"'
    )
  ).toHaveLength(1);
  expect(result.problems).toHaveLength(6);
  expect(result).toMatchSnapshot();
});

test('Validate application code', async () => {
  const result = await parseCmsSqlQuery(
    `
      SELECT
        TIMESTAMP, MVSID, SSID, ENCLCPUT, ENCLPER_P_, ENCLPIDX, WRITETIME
      FROM
        ABC.REALTHDA
      HISTORY()
      WHERE
        ORIGINNODE = 'DB2plex:DB2plex:Plexview' OR
        ORIGINNODE = 'ICB4:RSD2:DB2' OR
        ORIGINNODE = 'IDS4:DB2plex:DSGROUP' OR
        ORIGINNODE = 'XEDB2:RSD2';
    `,
    mockedMetadataLoader
  );
  expect(result).toMatchSnapshot();
});

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {
    void 0;
  });
});

test('Validate table ID', async () => {
  const result = await parseCmsSqlQuery(
    `
      SELECT
        TIMESTAMP, MVSID, SSID, ENCLCPUT, ENCLPER_P_, ENCLPIDX, WRITETIME
      FROM
        KDP.FAKETDA
      HISTORY()
      WHERE
        ORIGINNODE = 'DB2plex:DB2plex:Plexview' OR
        ORIGINNODE = 'ICB4:RSD2:DB2' OR
        ORIGINNODE = 'IDS4:DB2plex:DSGROUP' OR
        ORIGINNODE = 'XEDB2:RSD2';
    `,
    mockedMetadataLoader
  );
  expect(result).toMatchSnapshot();
});

test('Validate GROUP BY', async () => {
  const result = await parseCmsSqlQuery(
    `
      SELECT
        TIMESTAMP, MVSID, SSID, ENCLCPUT, ENCLPER_P_, ENCLPIDX, WRITETIME
      FROM
        KDP.REALTHDA
      HISTORY()
      WHERE
        ORIGINNODE = 'DB2plex:DB2plex:Plexview' OR
        ORIGINNODE = 'ICB4:RSD2:DB2' OR
        ORIGINNODE = 'IDS4:DB2plex:DSGROUP' OR
        ORIGINNODE = 'XEDB2:RSD2'
      GROUP BY
        BLABLA;
    `,
    mockedMetadataLoader
  );
  expect(result).toMatchSnapshot();
});
