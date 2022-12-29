const cosmos = require('@azure/cosmos');
//URI: https://cosmos-sql-metadata-nemera.documents.azure.com:443/
// key : nkyLTjjT2CYT7jbcygENG67tDztXzBSE7jKb9yyAa09HpJEf2Uv0gCFbc2Qlj7OP2Jo7bzv2NCMmACDb6tK9Ww==
const dbClient = new cosmos.CosmosClient({
  endpoint: 'https://cosmos-sql-metadata-nemera.documents.azure.com:443/',
  key:
    'nkyLTjjT2CYT7jbcygENG67tDztXzBSE7jKb9yyAa09HpJEf2Uv0gCFbc2Qlj7OP2Jo7bzv2NCMmACDb6tK9Ww==',
});

const container = dbClient.database('nemera').container('targets');

const get_target = async (id) => {
  //const id = '7ff669e5-ad8c-4360-8a9d-0a7ef1aa4721';
  const query = `SELECT * FROM n WHERE n.id = '${id}'`;
  const { resources } = await container.items.query(query).fetchAll();
  return resources;
};

const get_targets = async () => {
  const query = `SELECT * FROM n`;
  const { resources } = await container.items.query(query).fetchAll();
  return resources;
};
const Queries = {
  'get.many.targets': get_targets,
  'get.one.targets': get_target,
};
export default Queries;
