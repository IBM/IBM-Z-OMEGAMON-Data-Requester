import { assert } from 'public-common';
import { ColumnMetadataMap, TableMetadata } from 'public-domain';

import { MetadataLoader } from 'datasource/features/metadata';
import { mockedApplicationMetadatas } from 'datasource/features/metadata/mocks';

import { parseCmsSqlQuery } from './parseCmsSqlQuery';

/**
 * During validation of query we check query itself and variables it uses.
 * Current tests are focused on insensitivity check and don't need variables,
 * So add empty mock of getTemplateSrv to avoid failing tests on this
 */
jest.mock('@grafana/runtime', () => ({
  getTemplateSrv: () => ({
    getVariables: () => {
      return [];
    },
  }),
}));

test('Parser is case insensitive', async () => {
  // In those queries, only "PARMA" literal should make any difference
  const queries = [
    'SELECT COL1, MAX(COL2), COL3 FROM APPL.TABLE AT("NODE") HISTORY() WHERE FIRST(3) AND SYSTEM.PARMA("PARMA") AND COL4 <> 4 AND (COL1 <> 42 OR COL2 = 3) GROUP BY COL5, COL6 ORDER BY COL7 ASC',
    'select col1, max(col2), col3 from appl.table at("node") history() where first(3) and system.parma("PARMA") and col4 <> 4 and (col1 <> 42 or col2 = 3) group by col5, col6 order by col7 asc',
    'Select col1, max(col2), col3 from appl.Table at("Node") history() where first(3) and system.Parma("PARMA") and col4 <> 4 and (col1 <> 42 or col2 = 3) group by col5, col6 order by col7 asc',
    'Select Col1, Max(Col2), Col3 From Appl.table At("Node") History() Where First(3) And System.parma("PARMA") And Col4 <> 4 And (Col1 <> 42 Or Col2 = 3) Group By Col5, Col6 Order By Col7 Asc',
    'sElEcT CoL1, MaX(CoL2), cOl3 FrOm aPpL.tAbLe aT("nOdE") HiStOrY() WhErE FiRsT(3) aNd sYsTeM.PaRmA("PARMA") aNd cOl4 <> 4 aNd (CoL1 <> 42 oR CoL2 = 3) GrOuP By cOl5, cOl6 OrDeR By cOl7 AsC',
    'sELECT cOL1, mAX(cOL2), cOL3 fROM aPPl.TABLE AT("nODE") hISTORY() wHERE fIRST(3) AND sYSTEM.PARMA("PARMA") AND cOL4 <> 4 AND (cOL1 <> 42 OR cOL2 = 3) gROUP BY cOL5, cOL6 oRDER BY cOL7 aSC',
  ];
  assert(queries[0]);
  const fakeMetadataLoader = {
    getApplicationMetadatas: async () => mockedApplicationMetadatas,
    getTableMetadata: async () =>
      ({
        applicationCode: 'APPL',
        id: 'TABLE',
        columns: {
          COL1: { id: 'COL1', type: 'number' },
          COL2: { id: 'COL2', type: 'number' },
          COL3: { id: 'COL3', type: 'number' },
          COL4: { id: 'COL4', type: 'number' },
          COL5: { id: 'COL5', type: 'number' },
          COL6: { id: 'COL6', type: 'number' },
          COL7: { id: 'COL7', type: 'number' },
          ORIGINNODE: { id: 'ORIGINNODE', type: 'string' },
        } as unknown as ColumnMetadataMap,
      }) as unknown as TableMetadata,
  } as unknown as MetadataLoader;
  const { queryObject: referenceResult } = await parseCmsSqlQuery(queries[0], fakeMetadataLoader);
  expect(referenceResult).not.toBeNull();

  queries.forEach(async (query) => {
    const { queryObject } = await parseCmsSqlQuery(query, fakeMetadataLoader);
    expect(queryObject).toEqual(referenceResult);
  });
});
