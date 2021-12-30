module.exports = {
  apiClient: {
    input: {
      target: '../../apps/backend/swagger.json',
    },
    output: {
      client: 'react-query',
      mode: 'tags',
      target: './src/client',
      override: {
        mutator: './src/response-type.ts',
      },
    },
  },
};
