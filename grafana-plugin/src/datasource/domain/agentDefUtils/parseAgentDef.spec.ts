import { parseAgentDef } from './parseAgentDef';

test('should return argument for a valid originnode', () => {
  expect(parseAgentDef('RSPLUI01:RS25:MVSSYS')).toEqual({
    id: 'agentOrGroupName',
    name: 'RSPLUI01:RS25:MVSSYS',
  });
});

test('should return trimmed value for a valid originnode', () => {
  expect(parseAgentDef('        RSPLUI01:RS25:MVSSYS        ')).toEqual({
    id: 'agentOrGroupName',
    name: 'RSPLUI01:RS25:MVSSYS',
  });
});

test('should parse @Lpar correctly', () => {
  expect(parseAgentDef('@Lpar(RS25)')).toEqual({
    id: 'atLpar',
    lpars: ['RS25'],
  });
});

test('should trim all the whitespaces in @Lpar calls', () => {
  expect(parseAgentDef('  @Lpar(RS25, RS26, RS27  )  ')).toEqual({
    id: 'atLpar',
    lpars: ['RS25', 'RS26', 'RS27'],
  });
});

test('should allow variable as originnode', () => {
  expect(parseAgentDef('$test')).toEqual({
    id: 'agentOrGroupName',
    name: '$test',
  });
});

test('should allow variables as lpar', () => {
  expect(parseAgentDef('@Lpar($test)')).toEqual({
    id: 'atLpar',
    lpars: ['$test'],
  });
});

test('should not throw on empty @Lpar arguments', () => {
  expect(() => parseAgentDef('@Lpar()')).not.toThrow();
  expect(() => parseAgentDef('@Lpar(,,   ,,,)')).not.toThrow();
});

test('should throw on wrong APAR', () => {
  expect(() => parseAgentDef('@Lpar(%wrong)')).not.toThrow();
});

test('should filter out empty lpars', () => {
  expect(parseAgentDef('@Lpar(rs22,)')).toEqual({ id: 'atLpar', lpars: ['rs22'] });
  expect(parseAgentDef('@Lpar(,,,    , ,, ,,,, ,)')).toEqual({ id: 'atLpar', lpars: [] });
});
